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
  const [latestStat, setLatestStat] = useState(null); // State to store the most recent stat

  const saveStats = async () => {
    if (!weight || !height || !activityLevel || !goalWeight || !age) {
      console.error("All fields are required!");
      return;
    }

    const userStats = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      activityLevel,
      goalWeight: parseFloat(goalWeight),
      age: parseInt(age, 10),
      timestamp: Date.now(),
    };

    try {
      console.log("Saving stats:", userStats);
      await addDoc(collection(db, "userStats"), userStats);
      console.log("Stats saved successfully!");
      setWeight("");
      setHeight("");
      setActivityLevel("");
      setGoalWeight("");
      setAge("");
      Keyboard.dismiss(); // Dismiss the keyboard after saving
      loadLatestStat(); // Reload the most recent stat
    } catch (error) {
      console.error("Error saving stats:", error);
    }
  };

  const loadLatestStat = async () => {
    try {
      const q = query(collection(db, "userStats"), orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      const latest = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))[0]; // Get the first (most recent) document
      setLatestStat(latest);
    } catch (error) {
      console.error("Error loading latest stat:", error);
    }
  };

  // Load the most recent stat when the component mounts
  React.useEffect(() => {
    loadLatestStat();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>My Stats</Text>
        <TextInput
          style={styles.input}
          placeholder="Weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
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
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Button title="Save Stats" onPress={saveStats} />

        <Text style={styles.title}>Latest Saved Stat</Text>
        {latestStat ? (
          <View style={styles.statItem}>
            <Text>Weight: {latestStat.weight}</Text>
            <Text>Height: {latestStat.height}</Text>
            <Text>Activity Level: {latestStat.activityLevel}</Text>
            <Text>Goal Weight: {latestStat.goalWeight}</Text>
            <Text>Age: {latestStat.age}</Text>
          </View>
        ) : (
          <Text>No stats saved yet.</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  statItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});