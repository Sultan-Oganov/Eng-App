import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Header";
import Hello from "./Hello";
import Registration from "./Registration";
import Login from "./Login";
import LoginEmail from "./LoginEmail";
import LoginChange from "./LoginChange";
import LoginPassword from "./LoginPassword";
import Rules from "./Rules";
import Rules1 from "./Rules/Rules1";
import Rules2 from "./Rules/Rules2";
import Rules5 from "./Rules/Rules5";
import Rules3 from "./Rules/Rules3";
import Rules4 from "./Rules/Rules4";

const AuthScene = () => {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'red' } }}>
        <Stack.Screen name='Hello' options={{ headerShown: false }} component={Hello} />
        <Stack.Screen name='Registration' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Registration} />
        <Stack.Screen name='Login' options={{ header: props => <Header props={props} />, }} component={Login} />
        <Stack.Screen name='LoginEmail' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={LoginEmail} />
        <Stack.Screen name="LoginChange" options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={LoginChange} />
        <Stack.Screen name='LoginPassword' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={LoginPassword} />
        <Stack.Screen name='Rules' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Rules} />
        <Stack.Screen name='Rules1' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Rules1} />
        <Stack.Screen name='Rules2' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Rules2} />
        <Stack.Screen name='Rules3' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Rules3} />
        <Stack.Screen name='Rules4' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Rules4} />
        <Stack.Screen name='Rules5' options={{ header: props => <Header props={props} />, headerTintColor: '#2A80F1' }} component={Rules5} />
        
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

export default AuthScene;