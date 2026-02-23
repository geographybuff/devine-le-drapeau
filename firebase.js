// firebase.js — Initialisation Firebase (partagé entre toutes les pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeR9KlG5QIApd8Fa4wL0oAI9iOnm7pCw0",
  authDomain: "guess-the-flag-f9aa3.firebaseapp.com",
  projectId: "guess-the-flag-f9aa3",
  storageBucket: "guess-the-flag-f9aa3.firebasestorage.app",
  messagingSenderId: "404560733293",
  appId: "1:404560733293:web:cc68dd5a2b62fb37308b64",
  measurementId: "G-3TS4ML0LWQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
