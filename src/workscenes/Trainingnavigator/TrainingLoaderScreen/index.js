import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Dimensions, StyleSheet, Image, SafeAreaView, ActivityIndicator } from "react-native";
import Loading from "../../Loading";
import { setVocabulary } from "../../../AsyncStorage/AsyncStorage";
import { getWordsVocabulary } from "../../../actions/apiActions";
import sensei from "../../../images/sensei.png";
import { learnRoutine, countRoutine, vocabularyRoutine } from "../../../store/wordsReducer";
import { wordsToLearn, wordsLimit, getDate } from "../../../constants/index";

const getPlane = (value) => {
  if (value) return new Date(value);
  const date = getDate(); // new Date(); 
  date.setMinutes(date.getMinutes() - 1);
  return date;
};

const TrainingLoaderScreen = ({ learnRoutine, countRoutine, vocabularyRoutine }) => {
  const navigation = useNavigation();
  const [isDobor, setIsDobor] = useState(false);

  const getVocWords = async () => {
    let list = await getWordsVocabulary();
    await setVocabulary(list);
    vocabularyRoutine({ vocabulary: list });
    if (!list || list.length === 0) {
      navigation.navigate("Start");
      return;
    }

    list.sort((itemA, itemB) => {
      const logA = itemA.wordRus[0].loggs[0];
      const logB = itemB.wordRus[0].loggs[0];
      if (logA.wordzone === logB.wordzone) {
        logA.plane = getPlane(logA.plane);
        logB.plane = getPlane(logB.plane);
        return logA.plane.getTime() - logB.plane.getTime();
      }
      return logB.wordzone - logA.wordzone;
    });

    let bronze = 0;
    const timing = getDate().getTime(); // new Date().getTime();
    const trList = [];
    const bronzeList = [];
    list.forEach((item) => {
      const log = item.wordRus[0].loggs[0];
      log.plane = getPlane(log.plane);
      if (log.wordzone < 2) bronze++;
      if (log.plane.getTime() <= timing && trList.length < wordsToLearn) {
        trList.push(item);
      } else {
        if (log.wordzone < 2) bronzeList.push(item);
      }
    });

    if (trList.length < wordsToLearn) {
      let learnCount = Math.min(
        wordsToLearn - trList.length,
        wordsLimit - bronze
      );
      if (learnCount > 0) {
        learnCount = wordsToLearn - learnCount;
        countRoutine({ learnCount });
        setIsDobor(true);
        return;
      } else {
        do {
          trList.push(bronzeList[0]);
          bronzeList.splice(0, 1);
        } while (trList.length < wordsToLearn && bronzeList.length > 0);
      }
    }

    for (let i = 0; i < trList.length; i++) {
      const log = trList[i].wordRus[0].loggs[0];
      if (log.wordzone < 2) {
        const koe = trList.length - i - 1;
        for (let j = 1; j <= trList.length; j++) {
          const index = i + Math.round(koe * Math.random() - 0.499999);
          trList.splice(index, 0, trList.pop());
        }
        break;
      }
    }

    learnRoutine({ learnVocabulary: trList, learnState: true });
    navigation.navigate("TrainingsScreen");
  };

  useEffect(() => {
    getVocWords();
  }, []);

  return isDobor 
    ? <Loading />
    : <SafeAreaView style={styles.container}>
      <View>
        <Image source={sensei} style={styles.master} />
        <Text style={styles.title}>
          На основе твоих ответов, я подбираю тебе программу тренировок.
        </Text>
      </View>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
};

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-around",
    paddingEnd: 20,
    paddingStart: 20,
  },
  master: {
    width: "100%",
    height: windowWidth * 0.87,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
    marginTop: windowWidth * 0.012,
    fontFamily: 'Gilroy-Regular',
  },
});

const mapDispatchToProps = { learnRoutine, countRoutine, vocabularyRoutine };
export default connect(null, mapDispatchToProps)(TrainingLoaderScreen);
