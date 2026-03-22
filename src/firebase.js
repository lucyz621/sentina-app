import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy2tWwrwO9NUbROosrUGmQJaVROb0L710",
  authDomain: "sentina-app-ad369.firebaseapp.com",
  projectId: "sentina-app-ad369",
  storageBucket: "sentina-app-ad369.firebasestorage.app",
  messagingSenderId: "29250041794",
  appId: "1:29250041794:web:ef8c4722b8d872ba90c85b",
  measurementId: "G-NS3N8ZF1RT"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);