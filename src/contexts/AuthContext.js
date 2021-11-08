import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../utils/init-firebase";

const AuthContext = createContext({
  currentUser: null,
});

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
