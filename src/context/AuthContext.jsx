import { useState, useContext, createContext } from "react";
import { projects } from "../mocks/data";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async ({ email, password }) => {
    const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (loginResponse.ok) {
      setToken(loginResponse.headers.get("Authorization"));
      const { status, data } = await loginResponse.json();
      setCurrentUser(data);
      return Promise.resolve({
        type: "success",
        message: status.message,
      });
    } else {
      const error = await loginResponse.text();
      return Promise.reject({ type: "error", message: error });
    }
  };

  const signup = async ({ email, password, password_confirmation }) => {
    try {
      const signupResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: { email, password, password_confirmation },
          }),
        }
      );
      if (signupResponse.ok) {
        setToken(signupResponse.headers.get("Authorization"));
        const { status, data } = await signupResponse.json();
        setCurrentUser(data);
        return Promise.resolve({
          type: "success",
          message: status.message
        })
      } else {
        setCurrentUser(null);
        setToken(null);
        const {status: {code, message}} = await signupResponse.json();
        return Promise.reject({
          type: "error",
          message
        })
      }
    } catch (e) {
      console.error(e)
      return Promise.reject({
        type: "error",
        error: e,
        message: "Something went wrong."
      });
    }
  };

  const logout = async () => {
    try {
      const logoutResponse = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (logoutResponse.ok) {
        setToken(null);
        setCurrentUser(null);
        const { message} = await logoutResponse.json()
        return Promise.resolve({
          type: "success",
          message
        })
      } else {
        logoutUser();
      }
    } 
    catch (error) {
      console.error(error);
      logoutUser();
    }
  };

  const logoutUser = () => {
    setToken(null);
    setCurrentUser(null);
  }

  const updateProfile = async (userFormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: userFormData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setCurrentUser(updatedUser);
        return Promise.resolve(updatedUser)
      } else {
        const errors = await response.json();
        return Promise.reject(errors);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const addProject = (project) => {
    setCurrentUser(user => {
      return {
        ...user,
        projects: [project, ...user.projects]
      }
    })
  }

  const updateProject = (project) => {
    setCurrentUser(user => {
      return {
        ...user,
        projects: user.projects.map(p => {
          if (p.id === project.id) {
            return project;
          } else {
            return p;
          }
        })
      }
    })
  }

  const deleteProject = (project) => {
    setCurrentUser((user) => {
      return {
        ...user,
        projects: user.projects.filter((p) => {
          return p.id !== project.id
        }),
      };
    });
  };

  const sharedValues = {
    token,
    updateProfile,
    isLoggedIn: !!currentUser,
    currentUser,
    addProject,
    updateProject,
    deleteProject,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("You must call useAuth from within an <AuthProvider />");
  }

  const authFetch = (url, config) => {
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
      ...config,
    });
  };

  return {
    ...authContext,
    authFetch,
  };
}

export { AuthContext, useAuth };
export default AuthProvider;
