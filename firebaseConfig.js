import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAwMzitcyFPefufv1OI00OQ_-k-bsrFvuI",
  authDomain: "fitnesstracker-4eb55.firebaseapp.com",
  projectId: "fitnesstracker-4eb55",
  storageBucket: "fitnesstracker-4eb55.firebasestorage.app",
  messagingSenderId: "508648783331",
  appId: "1:508648783331:web:319461c5f02209043fb4d6",
  measurementId: "G-LCWQC0CVWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { app, db };