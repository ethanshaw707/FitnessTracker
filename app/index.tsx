import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyStatsScreen from "../screens/MyStatsScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import UserProfile from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

export default function AppIndex() {
  console.log("Rendering AppIndex");
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Stats" component={MyStatsScreen} />
      <Tab.Screen name="Workouts" component={WorkoutScreen}/>
      <Tab.Screen name="Profile" component={UserProfile}/>
     
    </Tab.Navigator>
  );
}