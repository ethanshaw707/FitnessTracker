import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function WorkoutPlannerScreen() {
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = async () => {
    if (workoutName && duration) {
      const newWorkout = {
        name: workoutName,
        duration: parseInt(duration, 10),
        date: date.toDateString(),
        timestamp: Date.now(),
      };

      try {
        await addDoc(collection(db, "workoutPlans"), newWorkout); // Save to Firestore
        setWorkouts([...workouts, newWorkout]); // Update local state
        setWorkoutName("");
        setDuration("");
      } catch (error) {
        console.error("Error saving workout plan:", error);
      }
    }
  };

  const loadWorkouts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workoutPlans"));
      const loadedWorkouts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(loadedWorkouts);
    } catch (error) {
      console.error("Error loading workout plans:", error);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Planner</Text>

      <TextInput
        style={styles.input}
        placeholder="Workout Name (e.g., Running, Yoga)"
        placeholderTextColor={"black"}
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        placeholderTextColor={"black"}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>📅 {date.toDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Button title="Add Workout" onPress={addWorkout} />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutText}>
              {item.name} - {item.duration} min
            </Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
      />
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
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
  dateButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    color: "black",
    fontWeight: "bold",
  },
  workoutItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
  },
  workoutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});