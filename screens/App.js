import React from "react";
import AppIndex from "../app/index";
import firebaseApp from "../firebaseConfig"; // Import Firebase configuration

export default function App() {
  console.log("Firebase initialized:", firebaseApp.name); // Log Firebase app name
  console.log("Rendering App.js");
  return <AppIndex />;
}