import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCn95vCE-Rhzl7-u4zdOKTPrtDtufDYuh4",
  authDomain: "orchidshop-31581.firebaseapp.com",
  projectId: "orchidshop-31581",
  storageBucket: "orchidshop-31581.appspot.com",
  messagingSenderId: "1051869518640",
  appId: "1:1051869518640:web:b19475c20e1f4a76f786f5",
  measurementId: "G-3ZMK2TY0WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, createUserWithEmailAndPassword }; 