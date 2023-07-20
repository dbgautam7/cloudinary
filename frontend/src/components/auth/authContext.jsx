import React, { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { decryptedData } from "../utils/crypto";

export const initialAuthState = {
  accessToken: "",
  user: {
    id: "",
    email: "",
    username: "",
    dob: "",
    role: { id: "", name: "" },
    permissions: [
      { id: "", name: "", description: "", url: { id: "", path: "" } },
    ],
  },
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(["userDetails"]);
  const userDetails = cookies?.userDetails
    ? decryptedData(cookies?.userDetails)
    : initialAuthState;

  const [auth, setAuth] = useState(userDetails);

  console.log(auth, "auth");

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
