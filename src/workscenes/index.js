import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./Start";
import Loading from "./Loading";
import Testing from "./Testing/testing";
import Dashboard from "./Dashboard";
import Wait from "./Waits";
import TrainingLoaderScreen from './Trainingnavigator/TrainingLoaderScreen';
import InterruptedFlowScreen from './Trainingnavigator/InterruptedFlow';
import TrainingsScreen from './Trainingnavigator/TrainingScreen';
import Wellcome from "./Wellcome";
import WellcomeAim from "./WellcomeAim";
import WellcomeAge from "./WellcomeAge";
import WellcomeEng from "./WellcomeEng";
import WellcomeName from "./WellcomeName";
import WellcomeReady from "./WellcomeReady";
import WellcomeSex from "./WellcomeSex";
import WellcomeWAU from "./WellcomeWAU";
import Statistics2 from "./Statistics2";
import Statistics3 from "./Statistics3";
import TrainingMistake from "./Trainingnavigator/TrainingMistake";
import TestingDetail from "./TestingDetail";
import Tarif from "./Tarif";



const WorkScene = () => {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'red' } }}>
        <Stack.Screen name='Wait' options={{ headerShown: false }} component={Wait} />
        <Stack.Screen name='Start' options={{ headerShown: false }} component={Start} />
        <Stack.Screen name='Loading' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Loading} />
        <Stack.Screen name='Testing' options={{ headerShown: false }} component={Testing} />
        <Stack.Screen name='Dashboard' options={{ headerShown: false }} component={Dashboard} />
        <Stack.Screen name='TrainingLoaderScreen' options={{ headerShown: false }} component={TrainingLoaderScreen} />
        <Stack.Screen name='InterruptedFlowScreen' options={{ headerShown: false }} component={InterruptedFlowScreen} />
        <Stack.Screen name='TrainingsScreen' options={{ headerShown: false }} component={TrainingsScreen} />
        <Stack.Screen name='TrainingMistake' options={{ headerShown: false }} component={TrainingMistake} />
        <Stack.Screen name='Wellcome' options={{ headerShown: false }} component={Wellcome} />
        <Stack.Screen name='WellcomeAge' options={{ headerShown: false }} component={WellcomeAge} />
        <Stack.Screen name='WellcomeAim' options={{ headerShown: false }} component={WellcomeAim} />
        <Stack.Screen name='WellcomeEng' options={{ headerShown: false }} component={WellcomeEng} />
        <Stack.Screen name='WellcomeName' options={{ headerShown: false }} component={WellcomeName} />
        <Stack.Screen name='WellcomeReady' options={{ headerShown: false }} component={WellcomeReady} />
        <Stack.Screen name='WellcomeSex' options={{ headerShown: false }} component={WellcomeSex} />
        <Stack.Screen name='WellcomeWAU' options={{ headerShown: false }} component={WellcomeWAU} />
        <Stack.Screen name='Statistics2' options={{ headerShown: false }} component={Statistics2} />
        <Stack.Screen name='Statistics3' options={{ headerShown: false }} component={Statistics3} />
        <Stack.Screen name='TestingDetail' options={{ headerShown: false }} component={TestingDetail} />
        <Stack.Screen name='Tarif' options={{ headerShown: false }} component={Tarif} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WorkScene;
