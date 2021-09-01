import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, TouchableOpacity, Text, View } from 'react-native';
import Line from '../../../assets/images/line.svg'
import Bookmark from '../../../assets/images/bookmark.svg'
import SenseiIcon from '../../../assets/images/senseiIcon.svg'
import DictionaryLearning from '../DictionaryLearning';
import Profile from './Profile'
import Wellcome from '../Wellcome';
import { getDataStatistic, getWordsStatistic } from '../../actions/apiActions';
import { dataStatRoutine, wordStatRoutine, countStatRoutine, waitRoutine } from '../../store/statReducer';
import { removeWordCountAsync, setCurrentDay, setWordCountAsync } from "../../AsyncStorage/AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation, dataStatRoutine, wordStatRoutine, countStatRoutine }) => {
  const [page, setPage] = useState(0);

  const conditionDay = async () => {
    try {
      const day = await AsyncStorage.getItem("CurrentDay");
      if (day != null || day != undefined) {
        let result = JSON.parse(day)
        let d = new Date().getDate();
        if (result != d) {
          removeWordCountAsync()
        }
      };
      setCurrentDay();
    } catch {
    }
  }
  const conditionWordCountAsync = async (count) => {
    try {
      const countWord = await AsyncStorage.getItem("WordCount");
      if (countWord != null || countWord != undefined) {
        let result = JSON.parse(countWord) + count;
        setWordCountAsync(result);
        return result;
      } else {
        setWordCountAsync(count);
        return count;
      }
    } catch {
    }
  }

  const getStatistic = async () => {
    const { stat, statweek, statmonth, wordStat } = await getDataStatistic();
    dataStatRoutine({ stat, statweek, statmonth, wordStat });
    const words = await getWordsStatistic();
    wordStatRoutine({ words });
    await conditionDay(); 
    const count = await conditionWordCountAsync(0);
    countStatRoutine({ count });
  }

  // useEffect(() => {
  //   getStatistic()
  // }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStatistic();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.topContainer}>
        {page === 0 && <Profile />}
        {page === 1 && <DictionaryLearning />}
        {page === 2 && <Wellcome />}
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchContainer} onPress={() => setPage(0)}>
          <Line />
          <Text  style={[styles.textTypeContainer, page === 0 ? { color: '#2A80F1' } : { color: 'black'}]}>
            Я
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchContainer} onPress={() => setPage(1)}>
          <Bookmark />
          <Text  style={[styles.textTypeContainer, page === 1 ? { color: '#2A80F1' } : { color: 'black'}]}>
            Словарь
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchContainer} onPress={() => setPage(2)}>
          <SenseiIcon />
          <Text  style={[styles.textTypeContainer, page === 2 ? { color: '#2A80F1' } : { color: 'black'}]}>
            Сенсей
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const windowDimensions = Dimensions.get('window')
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  topContainer: {
    height: windowHeight * 0.92
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    height: windowHeight * 0.05
  },
  touchContainer: {
    fontSize:14,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTypeContainer: {
 
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Gilroy-Regular',
  }
})

const mapDispatchToProps = { dataStatRoutine, wordStatRoutine, countStatRoutine };
export default connect(null, mapDispatchToProps)(Dashboard);
