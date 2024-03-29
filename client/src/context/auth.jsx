import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
    currentPatient: null,
    token: "",
  };
  const [auth, setAuth] = useState(function () {
    const storedValue = localStorage.getItem("auth");
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("auth", JSON.stringify(auth));
    },
    [auth],
  );

  let Authstr = "";
  if (auth.token !== "") Authstr = `Bearer ${auth.token}`;
  axios.defaults.headers.common["Authorization"] = Authstr;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedData.user,
        token: parsedData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = function () {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
