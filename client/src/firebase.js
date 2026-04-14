import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyD3z3lm-n-1hUYY9_4sOCjDK4RDiRSWoX8",
  authDomain: "mess-managament.firebaseapp.com",
  projectId: "mess-managament",
  storageBucket: "mess-managament.firebasestorage.app",
  messagingSenderId: "139154582275",
  appId: "1:139154582275:web:528eed801ccfaebb879736",
  measurementId: "G-4PBZZPB7Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
