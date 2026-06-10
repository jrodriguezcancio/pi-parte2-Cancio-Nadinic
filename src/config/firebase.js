import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBNQZuSSW103AisiGEFAoZCjbTT4dL38wM",
  authDomain: "proyecto-final-6f92f.firebaseapp.com",
  projectId: "proyecto-final-6f92f",
  storageBucket: "proyecto-final-6f92f.firebasestorage.app",
  messagingSenderId: "352972439200",
  appId: "1:352972439200:web:e02aeacaceea29754193c5"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();