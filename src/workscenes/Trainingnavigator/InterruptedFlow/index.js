import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Dimensions, StyleSheet, Image, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import sensei from "../../../images/sensei_angry.png";
import { vocabularyRoutine, learnRoutine } from "../../../store/wordsReducer";
import CalcResults from "../component/results";
import buttonGradient from '../../../../assets/images/buttons.png';

const InterruptedFlowScreen = ({ user, vocabulary, learnVocabulary, vocabularyRoutine, learnRoutine }) => {
  const navigation = useNavigation();

  const doInterrupt = () => {
    CalcResults(user, vocabulary, learnVocabulary, vocabularyRoutine, learnRoutine);
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={sensei} style={styles.master} />
        <Text style={styles.title}>
          Я не засчитываю незавершённые тренировки
        </Text>
      </View>
      <View
      style={{flexDirection:'column', alignItems:'center'}}
      >
        <TouchableOpacity style={{width:'100%'}} onPress={() => navigation.goBack()}>
          <ImageBackground
            source={buttonGradient}
            style={[styles.trainingButton, { marginBottom: 10 }]}
          >
            <Text style={[styles.buttonText, { marginTop: -12 }]}>Вернуться в тренировку</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={doInterrupt}
          style={[
            styles.btn,
            {
              backgroundColor: "transparent",
              borderColor: "#2A80F1",
              borderWidth: 1,
              width:'90%', marginTop:-10,
              borderRadius: 49,
            },
          ]}
        >
          <Text style={{ color: "#2A80F1",fontSize:18, fontWeight:'700' }}>
            Прервать тренировку
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

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
    fontWeight: '700'
  },
  btn: {
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#2A80F1',
    alignItems: 'center'
  },
  trainingButton: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '4%',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: 'Gilroy-Regular',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight:'700'
  },


});

InterruptedFlowScreen.propTypes = {
  user: PropTypes.object,
  vocabulary: PropTypes.arrayOf(PropTypes.object),
  learnVocabulary: PropTypes.arrayOf(PropTypes.object),
};

InterruptedFlowScreen.defaultProps = {
  user: {},
  vocabulary: [],
  learnVocabulary: [],
};

const mapStateToProps = ({ users, words }) => ({
  user: users.user,
  vocabulary: words.vocabulary,
  learnVocabulary: words.learnVocabulary,
});

const mapDispatchToProps = { vocabularyRoutine, learnRoutine };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterruptedFlowScreen);
