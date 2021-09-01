import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
// import sensei from "../../../images/sensei.png";
import { vocabularyRoutine, learnRoutine } from "../../../store/wordsReducer";
import CalcResults from "../component/results";
import ProgressCircle from "react-native-progress-circle";
import LoaderImg from "../../../images/scoreImage.svg";
import { setWordCountAsync } from "../../../AsyncStorage/AsyncStorage";
import { countStatRoutine, statStatRoutine } from '../../../store/statReducer';
import { wordsToLearn } from '../../../constants';
// import { getDate } from '../../../constants';
import buttonGradient from '../../../../assets/images/buttons.png';

const TrainingCompleteScreen = ({ user, vocabulary, learnVocabulary, vocabularyRoutine, countStatRoutine, statStatRoutine, newCount, stat }) => {
  const navigation = useNavigation();

  const [wordCount, setWordCount] = useState(0);
  const [wordExp, setExp] = useState(0);

  const waitCalc = async () => {
    const { count, experience } = await CalcResults(user, vocabulary, learnVocabulary, vocabularyRoutine, learnRoutine);
    setWordCount(count);
    setExp(experience);
    newCount = newCount + count;
    setWordCountAsync(newCount);
    countStatRoutine({ count: newCount });
    const i = stat.length - 1;
    stat[i].experience += experience;
    stat[i].learned += count;
    statStatRoutine({ stat });
  };

  useEffect(() => {
    waitCalc();
  }, []);

  return (
    <View style={styles.container}>
      {
        wordCount <= wordsToLearn * 0.3 ? <Text style={styles.title}>Плохой результат !</Text> : wordCount <= wordsToLearn * 0.7 ? <Text style={styles.title}>Средний результат !</Text> : <Text style={styles.title}>Отличный результат !</Text>
      }

      <ProgressCircle
        percent={wordCount / wordsToLearn * 100}
        radius={100}
        borderWidth={15}
        color="#3399FF"
        shadowColor="#E5E5E5"
        bgColor="#fff"
        borderRadius={20}
      >
        <Text style={styles.loaderResult}>{wordCount + "/" + wordsToLearn}</Text>
      </ProgressCircle>

      <LoaderImg style={styles.loaderDecoration} />

      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("Statistics2", { wordExp: wordExp })
        }}
      >
        <ImageBackground
          source={buttonGradient}
          style={styles.trainingButton}
        >
          {
            wordCount <= 7 ? <Text style={styles.buttonText}>Продолжить !</Text> :
              <Text style={styles.buttonText}>Ура!</Text>
          }
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: windowWidth * 0.038,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
    marginTop: 40,
    fontFamily: 'Gilroy-Regular',
  },
  progressStat: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: windowWidth * -0.29 },
      { translateY: windowHeight * -0.18 },
    ],
  },
  loaderDecoration: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: windowWidth * -0.42 },
      { translateY: windowHeight * -0.23 },
    ],
  },
  loaderResult: {
    zIndex: 1000,
    justifyContent: "center",
    fontSize: 50,
    alignSelf: "center",
    fontFamily: 'Gilroy-Regular',
  },
  trainingButton: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: windowWidth * 0.02,
    marginBottom: windowWidth * 0.1,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    textAlign: "center",
    fontFamily: 'Gilroy-Regular',
    fontWeight: '700',
    marginTop: -7
  },
});

TrainingCompleteScreen.propTypes = {
  user: PropTypes.object,
  vocabulary: PropTypes.arrayOf(PropTypes.object),
  learnVocabulary: PropTypes.arrayOf(PropTypes.object),
  newCount: PropTypes.number,
  stat: PropTypes.arrayOf(PropTypes.object)
};

TrainingCompleteScreen.defaultProps = {
  user: {},
  vocabulary: [],
  learnVocabulary: [],
  newCount: 0,
  stat: []
};

const mapStateToProps = ({ users, words, stat }) => ({
  user: users.user,
  vocabulary: words.vocabulary,
  learnVocabulary: words.learnVocabulary,
  newCount: stat.count,
  stat: stat.stat
});

const mapDispatchToProps = { vocabularyRoutine, learnRoutine, countStatRoutine, statStatRoutine };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingCompleteScreen);
