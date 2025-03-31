import React, { useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testCollection"));
        console.log("Firestore test successful:", querySnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Firestore test failed:", error);
      }
    };

    testFirestore();
  }, []);

  return null;
}