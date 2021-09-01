import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import RNSpeedometer from 'react-native-speedometer'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChartsIntensity } from "../Dashboard/Profile/Charts-intensity";
import { defIntensity } from '../../constants';
import buttonGradient from '../../../assets/images/buttons.png';

const Statistics3 = ({ navigation, count, data }) => {

  const [countWord, setCountWord] = useState(0)

  useEffect(() => {
    setCountWord(count / defIntensity * 100)
  }, [])

  let arr = []
  for (let i = 0; i < 100; i++) {
    arr.push({
      name: `${i}`,
      key: `key${i}`,
      labelColor: '#fff',
      // activeBarColor: countWord < 20 ? countWord >= i - 4 ? '#EB5757' : '#e5e5e5' : countWord >= i ? '#EB5757' : '#e5e5e5',
      activeBarColor:'#2a80f1'
    })
  }

  return (
    <View style={styles.hostcontainer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.title}>Интенсивность</Text>
          <Text style={styles.result}>{Math.floor(countWord) > 100 ? 100 : Math.floor(countWord)}%</Text>
          <SafeAreaView style={styles.container}>
            <RNSpeedometer
              value={countWord}
              size={260}
              labels={arr}
              labelStyle={{ width: 0, fontSize: 0 }}
              labelNote={{ fontSize: 0, fontWeight: 'bold' }}
              innerCircleStyle={{ width: '85%', height: '85%' }}
            />
          </SafeAreaView>
          <Text style={styles.inform}>Интенсивность</Text>
          <View style={styles.graph}>
            <ChartsIntensity data={data} koe={1} />
          </View>
          <Text style={styles.resultTextBold}>Каждый день в ударном режиме</Text>
          <Text style={styles.resultText}>
            Занимайтесь ежедневно, чтобы это вошло в привычку
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Dashboard")}
        style={{ width: "100%" }}
      >
        <ImageBackground
          source={buttonGradient}
          style={styles.trainingButton}
        >
          <Text style={styles.buttonText}>Продолжить</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  hostcontainer: {
    backgroundColor: "white"
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
    marginTop: 50,
    fontFamily: 'Gilroy-Regular',
  },
  graph: {
    marginLeft: -20
  },
  result: {
    fontSize: 60,
    color: "#2F80ED",
    alignSelf: "center",
    marginTop: 25,
    fontFamily: 'Gilroy-Regular',
  },
  inform: {
    fontSize: 18,
    marginLeft: windowWidth * 0.05,
    marginTop: 40,
    marginBottom: 20,
    fontFamily: 'Gilroy-Regular',
  },
  resultTextBold: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'Gilroy-Regular',
    marginTop: 10,
  },
  resultText: {
    fontSize: 20,
    width:"80%",
    alignSelf:'center',
    lineHeight:20,
    textAlign: "center",
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
    fontFamily: 'Gilroy-Regular',
  },
  trainingButton: {
    width: "100%",
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: windowWidth * 0.02,
    marginBottom: windowWidth * 0.1,
  },
  scroll: {
    height: windowHeight - 40 - windowWidth * 0.12
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    textAlign: "center",
    fontFamily: 'Gilroy-Regular',
    marginTop: -13,
    fontWeight:'700'
  },
});

Statistics3.propTypes = {
  count: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object)
};
Statistics3.defaultProps = {
  count: 0,
  data: []
};
const mapStateToProps = ({ stat }) => ({
  count: stat.count,
  data: stat.stat
});

export default connect(mapStateToProps)(Statistics3);