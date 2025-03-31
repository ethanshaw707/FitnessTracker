import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function WorkoutPlannerScreen() {
    const [workoutName, setWorkoutName] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [workouts, setWorkouts] = useState([]);

    const addWorkout = () => {
        if (workoutName && duration){
            setWorkouts([
                ...workouts,
                {id: Date.now().toString(), name: workoutName, duration, date: date.toDateString()},
            ]);
            setWorkoutName("");
            setDuration("");
        }
    };

    return (
        <View style={styles.container}>
      <Text style={styles.title}>Workout Planner</Text>

      {/* Workout Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Workout Name (e.g., Running, Yoga)"
        placeholderTextColor={"black"}
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      {/* Workout Duration Input */}
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        placeholderTextColor={"black"}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      {/* Date Picker */}
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

      {/* Add Workout Button */}
      <Button title="Add Workout" onPress={addWorkout} />

      {/* List of Scheduled Workouts */}
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutText}>{item.name} - {item.duration} min</Text>
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