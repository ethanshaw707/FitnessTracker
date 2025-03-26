import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const newWorkout = {id: Date.now().toString(), exercise, duration, calories};
        const updatedWorkouts = [...workouts, newWorkout];

        setWorkouts(updatedWorkouts);
        await AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

        setExercises("");
        setDuration("");
        setCalories("");
    };

    const loadWorkouts = async () => {
        const savedWorkouts = await AsyncStorage.getItem("workouts");
        if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));
    };

    return  (
        <View style={styles.container}>
          <Text style={styles.title}>Log Your Workout</Text>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            value={exercise}
            onChangeText={setExercise}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (minutes)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Calories Burned"
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
    listItem: { fontSize: 16, padding: 5, borderBottomWidth: 1, borderBottomColor: "#ddd" }
  });