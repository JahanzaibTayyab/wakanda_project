import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
  signInWithRedirect,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  signInWithFacebook: () => Promise,
  verifyToken: () => Promise(),
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {}, [currentUser]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function verifyToken(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 200, data: "Token verified" });
      }, 3000);
    });
  }
  function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3005/login`,
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  }
  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithRedirect(auth, provider);
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
    verifyToken,
    signInWithFacebook,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
