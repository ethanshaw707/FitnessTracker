import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, StyleSheet } from "react-native";
import { db } from "../firebaseConfig"; // Import Firestore
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore functions

export default function WorkoutScreen() {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const saveWorkout = async () => {
    if (!exercise || !duration || !calories) return;

    const newWorkout = { exercise, duration, calories, timestamp: Date.now() };

    try {
      // Save to Firestore
      await addDoc(collection(db, "workouts"), newWorkout);
      setWorkouts([...workouts, newWorkout]); // Update local state
      setExercise("");
      setDuration("");
      setCalories("");
    } catch (error) {
      console.error("Error saving workout: ", error);
    }
  };

  const loadWorkouts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const loadedWorkouts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(loadedWorkouts);
    } catch (error) {
      console.error("Error loading workouts: ", error);
    }
  };

    return  (
        <View style={styles.container}>
          <Text style={styles.title}>Log Your Workout</Text>
          <Text style={styles.title}>Exercise</Text>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            placeholderTextColor={"black"}
            value={exercise}
            onChangeText={setExercise}
          />
          <Text style={styles.title}>Duration</Text>
          <TextInput
            style={styles.input}
            placeholder="Duration (minutes)"
            placeholderTextColor={"black"}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
          <Text style={styles.title}>Calories Burned</Text>
          <TextInput
            style={styles.input}
            placeholder="Calories"
            placeholderTextColor={"black"}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
          <Button title="Save Workout" onPress={saveWorkout} />
          
          <Text style={styles.title}>Workout History</Text>
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>
                {item.exercise} - {item.duration} min - {item.calories} kcal
              </Text>
            )}
          />
        </View>
      );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  listItem: { fontSize: 16, padding: 5, borderBottomWidth: 1, borderBottomColor: "#ddd" },
});