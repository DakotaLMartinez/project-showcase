import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMessage, setAuthMessage] = useState(null);

  const login = async ({ email, password }) => {
    
    const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (loginResponse.ok) {
      setToken(loginResponse.headers.get("Authorization"))
      setIsLoggedIn(true);
      const { status, data } = await loginResponse.json();
      setAuthMessage(status.message);
      setCurrentUser(data);
      return Promise.resolve(status.message);
    } else {
      const error = await loginResponse.text()
      setAuthMessage(error);
      return Promise.reject(error);
    }
  };

  const signup = ({ email, password, password_confirmation }) => {
    return fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password, password_confirmation },
      }),
    })
      .then((response) => {
        if (response.ok) {
          setToken(response.headers.get("Authorization"));
          return response.json();
        } else {
          return Promise.reject(response.json());
        }
      })
      .then(({ status, data }) => {
        setAuthMessage(status.message);
        setCurrentUser(data);
      })
      .catch(({ status: { code, message } }) => {
        setAuthMessage(message);
      });
  };

  const logout = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          setToken(null);
          setCurrentUser(null);
          return response.json();
        } else {
          return Promise.reject(response.json());
        }
      })
      .then(({ message }) => {
        setAuthMessage(message);
      })
      .catch(({ status: { code, message } }) => {
        setAuthMessage(message);
      });
  };

  const sharedValues = {
    isLoggedIn,
    currentUser,
    authMessage,
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
