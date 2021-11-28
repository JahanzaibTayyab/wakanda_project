import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBcJhYDEMmVmnEAJxGhQ8vXRDxXnLz9fcw",
  authDomain: "react-coffee-a2736.firebaseapp.com",
  projectId: "react-coffee-a2736",
  storageBucket: "react-coffee-a2736.appspot.com",
  messagingSenderId: "225030756508",
  appId: "1:225030756508:web:7ab655d2e38bd48937f559",
  measurementId: "G-9DKF5X404G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app, "europe-west3");
