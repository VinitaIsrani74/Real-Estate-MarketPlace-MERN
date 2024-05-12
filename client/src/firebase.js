// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-8428a.firebaseapp.com",
  projectId: "real-estate-mern-8428a",
  storageBucket: "real-estate-mern-8428a.appspot.com",
  messagingSenderId: "251441665922",
  appId: "1:251441665922:web:0b7447255a637bafe7619b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);