import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setIsLoggedIn(true);
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
        setIsLoggedIn(true);
        const { status, data } = await signupResponse.json();
        setCurrentUser(data);
        return Promise.resolve({
          type: "success",
          message: status.message
        })
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
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
    // return fetch(`${import.meta.env.VITE_API_URL}/logout`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       setToken(null);
    //       setCurrentUser(null);
    //       return response.json();
    //     } else {
    //       return Promise.reject(response.json());
    //     }
    //   })
    //   .then(({ message }) => {
    //     setAuthMessage(message);
    //   })
    //   .catch(({ status: { code, message } }) => {
    //     setAuthMessage(message);
    //   });
    const logoutResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/logout`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    if (logoutResponse.ok) {
      setToken(null);
      setCurrentUser(null);
      setIsLoggedIn(false);
      const { message} = await logoutResponse.json()
      return Promise.resolve({
        type: "success",
        message
      })
    }
  };

  const sharedValues = {
    isLoggedIn,
    currentUser,
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
