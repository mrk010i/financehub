import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your specific configuration from the screenshot
const firebaseConfig = {
  apiKey: "AIzaSyCX56aMZKGb_Hqrs4191fO_RZD7CTi9vqo",
  authDomain: "financehub-99087.firebaseapp.com",
  projectId: "financehub-99087",
  storageBucket: "financehub-99087.firebasestorage.app",
  messagingSenderId: "710401887874",
  appId: "1:710401887874:web:6847e597ec4a5b50212e9b",
  measurementId: "G-5HJNY5F3KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Login Function
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Logout Function
export const logout = () => {
  return signOut(auth);
};