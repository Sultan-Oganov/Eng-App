import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Platform, Alert } from "react-native";
import Target from "../../../../assets/images/Target.svg";
import Sword from '../../../../assets/images/Sword.svg'
import Hearts from '../../../../assets/images/Hearts.svg'
import GameController from '../../../../assets/images/GameController.svg'
import BG from '../../../../assets/images/dashboard_BG1.png'
import BG1 from '../../../../assets/images/dashboard_BG2.png'
import GreyLine3 from '../../../../assets/GreyLine3.svg';
import GreenLine from '../../../../assets/GreenLine.svg';
import { useNavigation } from "@react-navigation/native";
import { ChartsIntensity } from "./Charts-intensity";
import { ChartsExperience } from "./Charts-Experience";
import { ChartsKnow } from "./Charts-Know";
import buttonGradient from '../../../../assets/images/buttons.png';
import ProgressCircle from "react-native-progress-circle";
import { defLevel } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet from 'reanimated-bottom-sheet';
import { clearAll } from "../../../AsyncStorage/AsyncStorage";
import { userRoutine } from '../../../store/userReducer';
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDate, setDate } from "../../../constants";

const Profile = ({ user, wordCount, stat, statweek, statmonth, userRoutine }) => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [data, setCurrentDate] = useState(getDate());
  const [isDatePicker, setDatePicker] = useState(false);
  const [isTimePicker, setTimePicker] = useState(false);

  const ExpirChart = (data) => <ChartsExperience data={data} />;
  const IntensChart = (data, koe) => <ChartsIntensity data={data} koe={koe} />;
  const KnowChart = (data) => <ChartsKnow data={data} />;

  // wordCount = 7150; - раскомментировать и менять значениядля проверки цветов

  const beltColors = ['#BDBDBD', "#fff200", "#EDB578", "#64D146", "#EB3223", "#011EF6", "#8B2BF5", "#8C1910", "#6F4016", "#00000",];
  const beltCount = [300, 700, 1200, 1900, 2800, 4000, 5600, 7600, 10000];
  const getBeltColor = count => {
    for (let i = 0; i < beltCount.length; i++) {
      if (count < beltCount[i]) {
        return beltColors[i];
      }
    }
    return beltColors[beltColors.length - 1];
  }
  const sheetRef = React.useRef(null);

  const confirmExit = () =>
    Alert.alert(
      "Внимание !",
      "Вы действительно хотите выйти из профиля ?",
      [
        {
          text: "Нет",
          style: "cancel"
        },
        {
          text: "Да", onPress: () => {
            clearAll();
            userRoutine({ user: null });
          }
        }
      ],
      { cancelable: true }
    );

    const showPicker = () => {
      setDatePicker(true);
    };
    const doOnChange = (_event, value) => {
      if (value) {
        setDate(value);
        setCurrentDate(value);
        setTimePicker(true);
      }
      setDatePicker(false);
    };
    const doOnTimeChange = (_event, value) => {
      if (value) {
        setDate(value);
        setCurrentDate(value);
        Alert.alert(
          new Date(getDate()).toLocaleString("ru-RU", {
            timeZone: "Europe/Moscow",
          })
        );
      }
      setTimePicker(false);
    };

  const SlideContent = () => {
    return (
      <View style={{ paddingTop: 10, backgroundColor: 'white', borderTopEndRadius: 26, borderTopStartRadius: 26 }}>
        <View stickyHeaderIndices={[0]} >
          <View style={{ width: 50, height: 4, backgroundColor: '#E0E0E0', borderRadius: 30, position: 'absolute', top: 0, left: windowWidth / 2 - 25, }} ></View>
       
          <ImageBackground
            source={BG}
            resizeMode='stretch'
            style={styles.bg__achievements}
          >
            <View style={styles.awardsContainer}>
              <View style={styles.awardsHeader}>
                <View>
                  <Text style={styles.awardsTitle}>
                    Достижения
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.awardsShowAll}
                  >
                    <Text style={styles.awardsShowAll}>
                      Все
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth * 0.80, marginLeft: windowWidth * 0.08 }}>
                <View style={{ width: windowWidth * 0.29, alignSelf: 'flex-end' }}>
                  <Sword style={{ width: windowWidth * 0.20, height: windowWidth * 0.15, alignSelf: 'center' }} />
                  <Text style={{ textAlign: 'center', paddingTop: '5%', fontSize: 11, fontFamily: "Gilroy-Regular", fontWeight: "700", }}>
                    Целеустремленный
                  </Text>
                </View>
                <View style={{ width: windowWidth * 0.29, alignSelf: 'flex-end' }}>
                  <Hearts style={{ width: windowWidth * 0.20, height: windowWidth * 0.15, alignSelf: 'center' }} />
                  <Text style={{ textAlign: 'center', paddingTop: '5%', fontSize: 11, fontFamily: "Gilroy-Regular", fontWeight: "700", }}>
                    Знаток
                  </Text>
                </View>
                <View style={{ width: windowWidth * 0.29, alignSelf: 'flex-end' }}>
                  <GameController style={{ width: windowWidth * 0.20, height: windowWidth * 0.15, alignSelf: 'center' }} />
                  <Text style={{ textAlign: 'center', paddingTop: '5%', fontSize: 11, fontFamily: "Gilroy-Regular", fontWeight: "700", }}>
                    Неутомимый
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View>
            <ImageBackground
              source={BG1}
              resizeMode='stretch'
              style={styles.bg}
            >
              <View style={{ paddingTop: 35 }}>
                <Text style={styles.intensityTitle}>Интесивность</Text>
                <View style={styles.graph1}>
                  {page === 0 && IntensChart(statweek, 7)}
                  {page === 1 && IntensChart(statmonth, 30)}
                  {page === 2 && IntensChart(stat, 1)}
                </View>
              </View>
              {TimeSelector()}
            </ImageBackground>

            <ImageBackground
              source={BG1}
              resizeMode='stretch'
              style={styles.bg}
            >
              <View style={{ paddingTop: 35, }}>
                <Text style={styles.intensityTitle}>Опыт</Text>
                <View style={styles.graph}>
                  {page === 0 && ExpirChart(statweek)}
                  {page === 1 && ExpirChart(statmonth)}
                  {page === 2 && ExpirChart(stat)}
                </View>
              </View>
              {TimeSelector()}
            </ImageBackground>

            <ImageBackground
              source={BG1}
              resizeMode='stretch'
              style={styles.bg}
            >
              <View style={{ paddingTop: 35 }}>
                <Text style={styles.intensityTitle}>Выучено слов</Text>
                <View style={styles.graph}>
                  {page === 0 && KnowChart(statweek)}
                  {page === 1 && KnowChart(statmonth)}
                  {page === 2 && KnowChart(stat)}
                </View>
              </View>
              {TimeSelector()}
            </ImageBackground>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("TrainingLoaderScreen")}
          >
            <ImageBackground
              style={styles.trainingButton}
            >
              <Text style={styles.exerciseText}></Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const TimeSelector = () => (
    <View style={styles.monthContainer}>
      <TouchableOpacity style={[styles.touchContainer, page === 0 ? { backgroundColor: "#7FB3F7" } : {}]} onPress={() => setPage(0)}>
        <Text style={[styles.textContainer, page === 0 ? { color: "#ffff" } : {}]}>
          Н
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.touchContainer, page === 1 ? { backgroundColor: "#7FB3F7" } : {},]} onPress={() => setPage(1)}>
        <Text style={[styles.textContainer, page === 1 ? { color: "#ffff" } : {}]}>
          М
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.touchContainer, page === 2 ? { backgroundColor: "#7FB3F7" } : {}]} onPress={() => setPage(2)}>
        <Text style={[styles.textContainer, page === 2 ? { color: "#ffff" } : {}]}>
          Всe
        </Text>
      </TouchableOpacity>
    </View>
  )

  const [initialSnapShot, setInitialSnapShot] = React.useState([270, windowHeight - 176]);
  const defName = 'You name';

  console.log('render');

  return (
    <View style={styles.container}>
      <LinearGradient
        resizeMode='stretch'
        colors={['#24C9FF', '#5E46F9']}
        style={Platform.OS == 'android' ? styles.background : styles.backgroundIOS}
      >
        <TouchableOpacity style={styles.headerTop} >

        </TouchableOpacity>

        <View style={styles.vocabulary}>
          <View style={Platform.OS == 'android' ?
            { flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginBottom: windowHeight * 0.08, alignContent: 'flex-start' }
            : { flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginBottom: windowHeight * 0.04, alignContent: 'flex-start' }}>
            <View style={styles.vocabularyLeft}>
              <Text style={styles.vocabularyUserNAme} onPress={confirmExit}>{user.ownname || defName}</Text>
              <Text style={styles.vocabularyLeftTitle}>Словарный запас</Text>
            </View>
            <Text style={styles.vocabularyLeftCountWord}>{wordCount}</Text>
          </View>
          <View style={styles.covid}>
            <TouchableOpacity
              style={Platform.OS == 'android' ?
                { zIndex: 0, position: 'absolute', top: 10, left: -70, transform: [{ rotate: '0deg' }] }
                : { zIndex: 0, position: 'absolute', top: windowHeight * -0.002, left: windowWidth * -0.17, transform: [{ rotate: '-1deg' }] }
              }
              onPress={() =>
                navigation.navigate('Tarif')}>
              <GreenLine />
            </TouchableOpacity>
            <TouchableOpacity
              style={Platform.OS == 'android' ?
                { zIndex: 0, position: 'absolute', top: 165, left: -98, transform: [{ rotate: '-0deg' }] }
                : { zIndex: 0, position: 'absolute', top: windowHeight * 0.18, left: windowHeight * -0.11, transform: [{ rotate: '-3deg' }] }
              }
              onPress={() =>
                navigation.navigate('Tarif')}>
              <GreyLine3 />
            </TouchableOpacity>
            <TouchableOpacity
              style={Platform.OS == 'android' ?
                { zIndex: 0, position: 'absolute', top: 25, left: 75, transform: [{ rotate: '160deg' }] }
                : { zIndex: 0, position: 'absolute', top: windowHeight * 0.008, left: windowWidth * 0.2, transform: [{ rotate: '160deg' }] }}
              onPress={() =>
                navigation.navigate('Tarif')}>
              <GreyLine3 />
            </TouchableOpacity>
            <TouchableOpacity
              style={Platform.OS == 'android' ?
                { zIndex: 0, position: 'absolute', top: 130, left: 112, transform: [{ rotate: '225deg' }] }
                : { zIndex: 0, position: 'absolute', top: windowHeight * 0.14, left: windowWidth * 0.3, transform: [{ rotate: '226deg' }] }}
              onPress={() =>
                navigation.navigate('Tarif')}>
              <GreyLine3 />
            </TouchableOpacity>
            <TouchableOpacity
              style={Platform.OS == 'android' ?
                { zIndex: 0, position: 'absolute', top: 195, left: 46, transform: [{ rotate: '-90deg' }] }
                : { zIndex: 0, position: 'absolute', top: windowHeight * 0.23, left: windowWidth * 0.1, transform: [{ rotate: '-80deg' }] }}
              onPress={() =>
                navigation.navigate('Tarif')}>
              <GreyLine3 />
            </TouchableOpacity>
          </View>
          <ProgressCircle
            style={{ zIndex: 999, }}
            percent={wordCount % defLevel}
            radius={60}
            borderWidth={14}
            color={getBeltColor(wordCount)}
            shadowColor="#FFFF"
            bgColor='#2A80F1'
          >
            <Text style={styles.loaderResult}>{Math.floor(wordCount / defLevel)}</Text>
            <Text style={styles.loaderLevel}>Уровень</Text>
          </ProgressCircle>
    
        </View>
      </LinearGradient>

        <BottomSheet
          snapPoints={initialSnapShot}
          borderRadius={26}
          renderContent={SlideContent}
          enabledInnerScrolling={true}
          enabledBottomInitialAnimation
          enableOverDrag
        />

      <View style={{ backgroundColor: 'white', zIndex: 555, width: windowWidth, position: 'absolute', bottom: 0 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TrainingLoaderScreen")}
        >
          <ImageBackground
            source={buttonGradient}
            style={styles.trainingButton}
          >
            <Target style={styles.exerciseImage} />
            <Text style={styles.exerciseText}>Тренироваться</Text>
          </ImageBackground>
        </TouchableOpacity>

        {isDatePicker && (
          <DateTimePicker
            mode={"date"}
            value={data}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={doOnChange}
            style={styles.datePicker}
          />
        )}
        {isTimePicker && (
          <DateTimePicker
            mode={"time"}
            value={data}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={doOnTimeChange}
            style={styles.datePicker}
          />
        )}
        <TouchableOpacity onPress={showPicker}>
          <ImageBackground
            source={buttonGradient}
            style={styles.trainingButton}
          >
            <Target style={styles.exerciseImage} />
            <Text style={styles.exerciseText}>Дата и Время</Text>
          </ImageBackground>
        </TouchableOpacity>
        
      </View>

    </View>
  );
};

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  lineIos: {
    zIndex: 0,
    position: 'absolute',
    top: windowHeight * -0.003,
    left: -75,
  },
  container: {
    flex: 1,
    backgroundColor: "white",

  },
  background: {
    height: '100%',
    zIndex: -1
  },
  backgroundIOS: {
    height: '100%'
  },
  graph1: {
    marginLeft: 20,
  },
  graph: {
    marginLeft: 20,
  },
  headerCard: {
    flex: 1,
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: windowWidth * 0.06,
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    color: 'white',
    width: 120
  },
  headerExitWorkout: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    alignSelf: 'center'
  },
  headerTop: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: 325,
    paddingTop: windowHeight * 0.03,
  },
  headerSubtitle: {
    color: "#1D1F21",
    textAlign: "center",
    fontFamily: "Gilroy-Regular",
  },
  vocabulary: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: windowHeight * 0.16,
    marginTop: windowHeight * 0.04,
    width: windowWidth * 1,
    alignSelf: "center",
    alignItems: 'center'
  },
  vocabularyLeft: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 58
  },
  vocabularyLeftTitle: {
    fontSize: 17,
    color: "white",
    fontFamily: "Gilroy-Regular",
    lineHeight: 17
  },
  vocabularyLeftCountWord: {
    fontSize: 72,
    color: "white",
    fontFamily: "Gilroy-Regular",
    alignSelf: 'center',
    lineHeight: 72,
    fontWeight: '600',
    marginTop: '-1%'
  },
  vocabularyUserNAme: {
    fontFamily: "Gilroy-Regular",
    fontWeight: '600',
    fontSize: 36,
    color: 'white',
    lineHeight: 36
  },
  vocabularyLeftScholar: {
    width: windowWidth * 0.49,
    height: windowWidth * 0.6,
    alignSelf: "center",
  },
  vocabularyRight: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: windowWidth * 0.8,
  },
  intensityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1F21",
    marginBottom: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.04,
    fontFamily: "Gilroy-Regular",
    marginLeft: '10%'
  },
  trainingButton: {
    width: "100%",
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: "row",
    marginTop: windowHeight * 0.003,
    overflow: 'hidden',
  },
  exerciseImage: {
    width: 25,
    height: 25,
    marginRight: windowWidth * 0.015,
    alignSelf: "center",
    marginTop: -13
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: '700',
    color: "white",
    lineHeight: windowWidth * 0.06,
    alignSelf: "center",
    fontFamily: "Gilroy-Regular",
    marginTop: -10
  },
  icon: {
    width: 30,
    height: 30,
    color: "black",
    alignSelf: "center",
    justifyContent: "center",
  },
  belt: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.04,
    marginBottom: "3%",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#1D1F21",
  },
  beltpole: {
    width: windowWidth * 0.4 - 4,
    height: windowHeight * 0.04 - 4,
    borderRadius: 4,
    alignItems: "center",
  },
  belttext: {
    position: "absolute",
    alignSelf: "center",
    width: windowWidth * 0.4,
    textAlign: "center",
    textAlignVertical: "center",
    color: "grey",
    alignItems: "center",
    paddingTop: 3,
    fontSize: 14
  },
  date: {
    fontFamily: "Gilroy-Regular",
    fontSize: 16,
    color: "#828282",
  },
  date1: {
    fontFamily: "Gilroy-Regular",
    fontSize: 16,
    color: "#2A80F1",
  },
  monthContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "white",
    alignSelf: "center",
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
  },
  touchContainer: {
    flex: 1,
    flexDirection: "column",
    width: windowWidth * 0.03,
    height: windowHeight * 0.036,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: windowHeight * 0.025,
  },
  textContainer: {
    color: "#2A80F1",
    fontSize: 14,
    fontWeight: "400",
  },

  //===============

  bg__achievements: {
    width: '102%',
    height: 200,
    overflow: 'hidden',
    marginLeft: '-2%',

  },
  bg: {
    width: "102%",
    height: 285,
    overflow: 'hidden',
    marginLeft: '-2%',
    marginTop: '-10%',
    marginBottom: '-2%'
  },
  awardsContainer: {
    marginBottom: windowWidth * 0.085,
    marginTop: windowWidth * 0.08,
    borderRadius: 50
  },
  awardsHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '10%',
    marginBottom: 35,
  },
  awardsTitle: {
    fontSize: 14,
    // fontWeight: "700",
    color: "#2A80F1",
    fontFamily: "Gilroy-Regular",
    fontWeight: '700'

  },
  awardsShowAll: {
    fontFamily: "Gilroy-Regular",
    color: '#2A80F1',
    fontSize: 14
  },
  awardsCard: {
    alignSelf: 'center',
    width: windowWidth * 0.3,
  },
  awardsCardImage: {
    width: 40,
    height: 40,
    marginBottom: windowWidth * 0.012,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  awardsCardText: {
    fontFamily: "Gilroy-Regular",
    color: 'black',
    alignSelf: 'center',
    fontSize: windowHeight * 0.014,
    textAlign: 'center'
  },

  //==============
  loaderLevel: {
    fontSize: 14,
    lineHeight: 14,
    color: '#fff',
    fontFamily: "Gilroy-Regular",
  },
  loaderResult: {
    fontSize: 45,
    lineHeight: 45,
    color: '#fff',
    fontFamily: "Gilroy-Regular",
  },
  covid: {
    width: '40%',
    height: 155,
    alignSelf: 'center',
    // backgroundColor: 'red',
    position: 'absolute',
    top: 40
  },
  covidIOS: {
    width: '40%',
    height: 155,
    alignSelf: 'center',
    // backgroundColor: 'red',
    position: 'absolute',
    top: 60
  },
  covid__item: {
    width: 100,
    height: 5,
    backgroundColor: 'red',
    position: 'absolute',
    right: -100,
  },
});

Profile.propTypes = {
  user: PropTypes.object,
  wordCount: PropTypes.number,
  stat: PropTypes.arrayOf(PropTypes.object),
  statweek: PropTypes.arrayOf(PropTypes.object),
  statmonth: PropTypes.arrayOf(PropTypes.object),
};

Profile.defaultProps = {
  user: {},
  wordCount: 0,
  stat: [],
  statweek: [],
  statmonth: [],
};

const mapStateToProps = ({ users, stat }) => ({
  user: users.user,
  wordCount: stat.wordCount.learned,
  stat: stat.stat,
  statweek: stat.statweek,
  statmonth: stat.statmonth
});

const mapDispatchToProps = { userRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);