import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6-qc1JvtyiZeiPpOfwqY9u2zmYQ32H0U",
  authDomain: "estate-project-auth.firebaseapp.com",
  projectId: "estate-project-auth",
  storageBucket: "estate-project-auth.appspot.com",
  messagingSenderId: "939944286437",
  appId: "1:939944286437:web:643154d1d30f5b1ce5dc0c",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
