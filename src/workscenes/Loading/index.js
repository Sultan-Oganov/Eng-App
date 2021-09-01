import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import sensei from "../../images/sensei.png";
import Dobor from '../Testing/dobor';
import { wordsToLearn } from '../../constants';
import { putLogs } from '../../actions/apiActions';
import { logsRoutine } from "../../store/wordsReducer";

const Loading = ({ learnCount, logs, logsRoutine }) => {
  const navigation = useNavigation();
  const [handle, sethandle] = useState(true);
  const [isDobor, setIsDobor] = useState(false);
  const message = (wordsToLearn - learnCount > 0)
    ? 'По результатам проверки словарного запаса нам нужно подобрать еще ' +
    ` ${wordsToLearn - learnCount} слов для изучения.`
    : 'Мы подобрали нужное количество слов и можем переходить к тренировкам.';

  const handleLogs = () => {
    const addLogs = [];
    logs.filter(item => (item.answer === false)).forEach(item => {
      const { userId, wordEnId, wordRuId, answer, createdAt } = item;
      addLogs.push({ userId, wordEnId, wordRuId, answer, state: 0, mode: true, index: 0, createdAt });
    })
    addLogs.forEach(item => logs.push(item));
  }

  useEffect(() => {
    if (wordsToLearn - learnCount <= 0 && handle) {
      sethandle(false);
      handleLogs();
      putLogs(logs);
      logsRoutine({ logs: [] });
    }
  });

  const doborFinish = () => {
    setIsDobor(false);
  }

  return (
    isDobor 
      ? <Dobor doborFinish={doborFinish} />
      : <SafeAreaView style={styles.container} >
        <View style={{ paddingHorizontal: windowWidth * 0.038 }}>
          <Image source={sensei} style={styles.master} />
          <Text style={styles.title}>
          {message}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.containButton}
          onPress={() => {
            (wordsToLearn - learnCount > 0)
              ? setIsDobor(true)
              : navigation.navigate("Dashboard")
          }}
        >
          <Text style={styles.buttonText1}>Продолжить</Text>
        </TouchableOpacity>
      </SafeAreaView>
  );
}

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: windowWidth * 0.038,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  master: {
    width: 250,
    height: windowWidth * 0.47,
    alignSelf: "center",
    marginTop: windowWidth * 0.46,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
    fontFamily: 'Gilroy-Regular',
    marginTop: windowWidth * 0.12,
  },
  containButton: {
    backgroundColor: "#2A80F1",
    width: '90%',
    height: 45,
    justifyContent: "center",
    borderRadius: 39,
    flexDirection: "row",
    color: "white",
    marginTop: windowWidth * 0.06,
    marginBottom: windowWidth * 0.1,
    alignSelf: 'center'
  },
  buttonText1: {
    fontSize: windowWidth * 0.06,
    color: 'white',
    lineHeight: windowWidth * 0.06,
    alignSelf: 'center' ,
    fontFamily: 'Gilroy-Regular',
  }
});

Loading.propTypes = {
  learnCount: PropTypes.number,
  logs: PropTypes.arrayOf(PropTypes.object)
};

Loading.defaultProps = {
  learnCount: 0,
  logs: []
};

const mapStateToProps = ({ words }) => ({
  learnCount: words.learnCount,
  logs: words.logs
});

const mapDispatchToProps = { logsRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
