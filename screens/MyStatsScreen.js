import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { db } from "../firebaseConfig"; // Import Firestore
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore"; // Firestore functions

export default function MyStatsScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [age, setAge] = useState("");

  const calculateCalories = () => {
    if (!weight || !height || !age || !activityLevel) return "Enter all fields";

    let BMR = 
    10 * parseFloat(weight) +
    6.25 * parseFloat(height) -
    5 * parseFloat(age) +
    5;
    
    const activityFactors ={
      low: 1.2,
      moderate: 1.55,
      high: 1.9,
    };

    return (BMR * (activityFactors[activityLevel.toLowerCase()] || 1.2)).toFixed(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Stats</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Activity Level"
        value={activityLevel}
        onChangeText={setActivityLevel}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal Weight"
        value={goalWeight}
        onChangeText={setGoalWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />

       {/* Display the calculated calorie needs */}
       <Text style={styles.caloriesText}>
        Estimated Calories Needed: {calculateCalories()} kcal/day
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  caloriesText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
});