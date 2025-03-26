import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function MyStatsScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [age, setAge] = useState("");

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
});