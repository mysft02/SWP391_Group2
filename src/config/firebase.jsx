// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgrMtSlXkmNAmL0S91xbc1B2kSG_AFZrc",
  authDomain: "login-40c35.firebaseapp.com",
  projectId: "login-40c35",
  storageBucket: "login-40c35.appspot.com",
  messagingSenderId: "567838034494",
  appId: "1:567838034494:web:1fb7c48a118f577e871f6f",
  measurementId: "G-YJ9QR2363P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // Export `auth` for use in other files
