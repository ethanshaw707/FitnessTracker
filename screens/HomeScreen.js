import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Pedometer} from "expo-sensors";

export default function HomeScreen() {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const subscribe = Pedometer.watchStepCount(result => {
      setSteps(result.steps);
    });
    return () => subscribe && subscribe.remove();
  
  },[]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fitness Tracker! </Text>

      <Text style={styles.steps}>Steps Taken: {steps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
});