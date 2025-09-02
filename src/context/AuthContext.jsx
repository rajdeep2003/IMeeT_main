import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    user: auth0User,
    loginWithRedirect,
    logout: auth0Logout,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated && auth0User) {
        try {
          const token = await getAccessTokenSilently();
          const updatedUser = { ...auth0User, token };
          setUser(updatedUser);

          await axios.post(
            "https://imeetserver2k25.onrender.com/add-user",
            { user: updatedUser },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error("Error in authentication process:", error);
        }
      }
    };

    getToken();
  }, [isAuthenticated, auth0User, getAccessTokenSilently]);

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    return true;
  };

  const logout = () => {
    setUser(null); // clear local state

    // Remove Auth0 cached tokens (since cacheLocation=localstorage)
    localStorage.removeItem("auth0.is.authenticated");
    localStorage.removeItem(
      "@@auth0spajs@@::dev-jgsawtvpf2vqmlx7.us.auth0.com::default::openid profile email"
    );

    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login: () =>
          loginWithRedirect({
            authorizationParams: { redirect_uri: window.location.origin },
          }),
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
