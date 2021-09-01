import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Spinner = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" width="350" color="#003300" />
      <Text style={styles.textloading}>
        Loading ...
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10
  },
  textloading: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  }
});

export default Spinner;