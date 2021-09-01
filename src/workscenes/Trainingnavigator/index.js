import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TrainingLoaderScreen from "./TrainingLoaderScreen";
import InterruptedFlowScreen from "./InterruptedFlow";
import TrainingsScreen from "./TrainingScreen";

const Trainingnavigator = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrainingLoaderScreen"
        options={{ headerShown: false }}
        component={TrainingLoaderScreen}
      />
      <Stack.Screen
        name="InterruptedFlowScreen"
        options={{ headerShown: false }}
        component={InterruptedFlowScreen}
      />
      <Stack.Screen
        name="TrainingsScreen"
        options={{ headerShown: false }}
        component={TrainingsScreen}
      />
    </Stack.Navigator>
  );
};

export default Trainingnavigator;
