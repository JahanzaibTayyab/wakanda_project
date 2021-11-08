import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    //  process.env.REACT_APP_API_KEY,
    "AIzaSyBcJhYDEMmVmnEAJxGhQ8vXRDxXnLz9fcw",
  authDomain:
    // process.env.REACT_APP_AUTH_DOMAIN,
    "react-coffee-a2736.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  //"react-coffee-a2736",
  storageBucket:
    // process.env.REACT_APP_STORAGE_BUCKET,
    "react-coffee-a2736.appspot.com",
  messagingSenderId:
    // process.env.REACT_APP_MESSAGING_SENDER_ID,
    "225030756508",
  appId:
    // process.env.REACT_APP_APP_ID,
    "1:225030756508:web:7ab655d2e38bd48937f559",
  measurementId:
    // process.env.REACT_APP_MEASUREMENT_ID,
    "G-9DKF5X404G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
