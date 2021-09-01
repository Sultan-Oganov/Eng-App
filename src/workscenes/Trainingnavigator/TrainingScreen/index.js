import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, Animated, PanResponder, Dimensions } from "react-native";
import TrainingComplete from "../TrainingComplete";
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";
import { getData } from "../../../AsyncStorage/AsyncStorage";
import ProgressBar from "../component/ProgressBar";
import Swiper from "../component/SwiperHOC";
import { errorsLimit, getDate } from "../../../constants/index";
import { learnRoutine } from "../../../store/wordsReducer";
// import { AudioPlayer } from "../component/AudioPlayer";

const closeImg = require("../../../images/close.png");
const detailsImg = require("../../../images/detailsImg.png");
const rightArrow = require("../../../images/icon.png");
const leftArrow = require("../../../images/icon1.png");

import LeftArrow from '../../../images/leftArrow.svg'
import RightArrow from '../../../images/rightArrow.svg'

const TrainingsScreen = ({ navigation, learnVocabulary, learnState, learnRoutine }) => {

  useEffect(() => {
    getData();
    setProgress(0);
    setCheckResp(false);
  }, []);

  const [progress, setProgress] = useState(0);
  const [checkResp, setCheckResp] = useState(false);
  const [timing, setTiming] = useState();
  //const [currentAudio, setCurrentAudio] = useState("https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3");

  // const AudioPlayPauseRef = useRef(null);

  const [activeModal, setActiveModal] = useState(false);

  const testPosition = (position) => {
    if (learnVocabulary.length <= position) {
      learnRoutine({ learnVocabulary, learnState: false });
    }
  };

  const handleUserResponce = (value) => {
    if (checkResp) {
      let step = 1;
      if (value) {
        learnVocabulary[progress].errors = 0;
        learnVocabulary[progress].time = getDate(); // new Date();
        learnVocabulary[progress].timing = getDate().getTime() - timing; // new Date().getTime() - timing;
      } else {
        const item = learnVocabulary[progress];
        if (!item.errors) item.errors = 1;
        else item.errors += 1;
        if (item.errors < errorsLimit) {
          item.falseAttempts = item.errors;
          item.result = false;
          learnVocabulary.splice(progress, 1);
          learnVocabulary.push(item);
          learnRoutine({ learnVocabulary, learnState: true });
          step = 0;
        } else {
          learnVocabulary[progress].timing = getDate().getTime() - timing; // new Date().getTime() - timing;
          learnVocabulary[progress].time = getDate(); // new Date();
        }
      }
      setProgress(progress + step);
      testPosition(progress + step);
    }
    setCheckResp(false);
    setTiming(getDate().getTime());   // new Date().getTime());
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setCheckResp(true)


  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      {/* <AudioPlayer
        audio={currentAudio}
        handlePlayPause={() => {}}
        ref={AudioPlayPauseRef}
      /> */}
      {learnState ? (
        <SafeAreaView style={styles.wrapper}>
          <View
            style={
              (styles.content,
              activeModal
                ? styles.headerModalActive
                : styles.headerModalNonActive)
            }
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("InterruptedFlowScreen")}
                  activeOpacity={0.7}
                >
                  <Image source={closeImg} style={[styles.headerImg, {marginRight:30, marginLeft: 10}]} />
                </TouchableOpacity>

                <ProgressBar
                  width={240}
                  height={15}
                  progress={progress} //Your current point from 0 => size.length -1
                  size={learnVocabulary.length} //Max bar length
                />

                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("");
                    setActiveModal(true);
                  }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={detailsImg}
                    style={[styles.headerImg, { width: 31, height: 31, marginLeft: 30, marginRight: 10}]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Swiper
            fadeAnim={fadeAnim}
              data={learnVocabulary}
              checkResp={checkResp}
              onSwipeDirection={(e) => {
                handleUserResponce(e)
                // AudioPlayPauseRef.current.handlePlayPause();
              }}
              onCheckResp={() => {
                // setCheckResp(true)
                fadeIn()
                
                // AudioPlayPauseRef.current.handlePlayPause();
              }}
              progress={progress}
            />

            <View
              style={[
                styles.navigationBtn,
                !checkResp ? { justifyContent: "center" } : {},
              ]}
            >
              {!checkResp ? (
                <TouchableOpacity onPress={() => {
                  fadeIn()
                  }}
                style={styles.button}>
                  <Text style={styles.correct}>Ответ</Text>
                  <RightArrow alignSelf='center' width={16}/>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      fadeOut()
                      handleUserResponce(false)
                      }}
                    style={styles.button}
                  >
                    <LeftArrow alignSelf='center' width={16}/>
                    <Text style={styles.incorrect}>Ошибка</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      fadeOut()
                      handleUserResponce(true)
                      }}
                    style={styles.button}
                  >
                    <Text style={styles.correct}>Правильно</Text>              
                    <RightArrow alignSelf='center' width={16}/>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View
            backdropOpacity={0}
            style={
              activeModal
                ? styles.headerMenuModalActive
                : styles.headerMenuModalNonActive
            }
          >
            <View style={styles.headerMenuModalTop}>
              <TouchableOpacity style={styles.headerMenuButton}>
                <View>
                  <Text style={styles.headerBottomMoreKnowWord}>
                    Знаю это слово
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.headerMenuButton}>
                <View>
                  <Text style={styles.headerBottomMoreText}>
                    Добавить свою подсказку
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerMenuButton}
                onPress={() => navigation.navigate("TrainingMistake")}
              >
                <View>
                  <Text style={styles.headerBottomMoreText}>
                    Сообщить об ошибке
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveModal(false)}>
                <View>
                  <Text style={styles.headerBottomMoreGoBack}>Назад</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.headerMenuBlurContainer}>
              <View></View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <TrainingComplete />
      )}
    </View>
  );
};

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
  },
  swiper: {
    width: windowWidth * 0.14,
    height: windowHeight * 0.49,
  },
  wrapper: {
    paddingTop: getStatusBarHeight(),
    marginBottom: getBottomSpace(),
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerImg: {
    height: 20,
    width: 20,
    
  },
  navigationBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  incorrect: {
    fontSize: 22,
    color: "#EB5757",
    fontWeight: "400",
    lineHeight: 22,
    marginLeft: 10,
    fontFamily: 'Gilroy-Regular',
  },
  correct: {
    fontSize: 22,
    color: "#27AE60",
    fontWeight: "400",
    lineHeight: 22,
    marginRight: 10,
    fontFamily: 'Gilroy-Regular',
  },
  headerMenuModalActive: {
    display: "flex",
    position: "absolute",
    width: "100%",
    top: 0,
    flex: 1,
    margin: 0,
    justifyContent: "flex-start",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 1,
  },
  headerMenuModalNonActive: {
    display: "none",
  },
  headerMenuModalTop: {
    backgroundColor: "white",
    paddingTop: windowHeight * 0.08,
    paddingBottom: windowHeight * 0.1,
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 16.0,
    elevation: 24,
    height: windowHeight * 0.49,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerBottomMore: {
    flexDirection: "row",
    paddingTop: "6.5%",
    width: windowWidth * 0.04,
    height: 50,
    justifyContent: "space-between",
  },
  headerBottomMoreCircle: {
    width: windowWidth * 0.0073,
    height: windowWidth * 0.0073,
    backgroundColor: "#000000",
    borderRadius: windowWidth * 0.1,
  },
  headerMenuButton: {
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.01,
  },
  headerBottomMoreKnowWord: {
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
    color: "#219653",
    alignSelf: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: 'Gilroy-Regular',
  },
  headerBottomMoreText: {
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
    color: "#2A80F1",
    alignSelf: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: 'Gilroy-Regular',
  },
  headerBottomMoreGoBack: {
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
    color: "#EB5757",
    alignSelf: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: 'Gilroy-Regular',
  },
  headerMenuBlurContainer: {
    flex: 1,
  },
  headerModalActive: {
    marginTop: windowWidth * 0.0012,
    flex: 1,
    width: windowWidth,
    opacity: 0.4,
    backgroundColor: "black", 
  },
  headerModalNonActive: {
    marginTop: windowWidth * 0.0012,
    flex: 1,
    width: windowWidth,
  },
});

TrainingsScreen.propTypes = {
  learnVocabulary: PropTypes.arrayOf(PropTypes.object),
  learnState: PropTypes.bool,
};

TrainingsScreen.defaultProps = {
  learnVocabulary: [],
  learnState: true,
};

const mapStateToProps = ({ words }) => ({
  learnVocabulary: words.learnVocabulary,
  learnState: words.learnState,
});

const mapDispatchToProps = { learnRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(TrainingsScreen);
