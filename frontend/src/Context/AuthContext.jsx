import axios from "axios";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [authLoading, setauthLoading] = useState(false);
  const [token, setToken] = useState("");

  const verifyAuth = async (token) => {
    setauthLoading(true);
    try {
      await axios
        .post("http://localhost:8080/user/verify", { token })
        .then((res) => {
          logIn(res.data, token);
          setauthLoading(false);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    const fetch1 = async () => {
      const token = JSON.parse(localStorage.getItem("sportsToken"));
      if (token) {
        await verifyAuth(token);
      }
    };
    fetch1();
  }, []);

  const logOut = () => {
    localStorage.removeItem("sportsToken");
    setIsAuth(false);
    setUser({});
  };

  const logIn = (data, token) => {
    setUser({ name: data.username, id: data._id, token });
    setIsAuth(true);
  };

  const value = {
    isAuth,
    logOut,
    user,
    logIn,
    authLoading,
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
