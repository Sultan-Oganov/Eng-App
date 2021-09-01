import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, LogBox } from 'react-native';
import VoidMenu from '../../images/voidMenu.svg';
import Coin from '../../../assets/images/Coins4.svg'
import Level from '../../../assets/images/level.svg'
import Done from '../../../assets/images/Done.svg'
import { getdictionaryKnow, getdictionaryNew, getdictionaryLearn } from './../../actions/apiActions';
import Spinner from './../../Spinner/index';
import Bronze20 from "../../images/coins/bronze20.svg";
import Bronze40 from "../../images/coins/bronze40.svg";
import Bronze60 from "../../images/coins/bronze60.svg";
import Bronze80 from "../../images/coins/bronze80.svg";
import Bronze100 from "../../images/coins/bronze100.svg";
import Silver20 from "../../images/coins/silver20.svg";
import Silver40 from "../../images/coins/silver40.svg";
import Silver60 from "../../images/coins/silver60.svg";
import Silver80 from "../../images/coins/silver80.svg";
import Silver100 from "../../images/coins/silver100.svg";
import Gold20 from "../../images/coins/ggold20.svg";
import Gold40 from "../../images/coins/ggold40.svg";
import Gold60 from "../../images/coins/ggold60.svg";
import Gold80 from "../../images/coins/ggold80.svg";
import Gold100 from "../../images/coins/ggold100.svg";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function TestingDetail({ navigation, route }) {

  const [wordInfo, setWordInfo] = useState(route.params.word.item);
  // const [loading, setLoading] = useState(false)
  const [coins] = useState([
    { coin: <Bronze20 style={styles.coin} />, state: 1 },
    { coin: <Bronze40 style={styles.coin}/>, state: 2 },
    { coin: <Bronze60 style={styles.coin} />, state: 3 },
    { coin: <Bronze80 style={styles.coin}/>, state: 4 },
    { coin: <Bronze100  style={styles.coin}/>, state: 5 },
    { coin: <Silver20 style={styles.coin} />, state: 6 },
    { coin: <Silver40 style={styles.coin} />, state: 7 },
    { coin: <Silver60 style={styles.coin} />, state: 8 },
    { coin: <Silver80 style={styles.coin} />, state: 9 },
    { coin: <Silver100 style={styles.coin}/>, state: 10 },
    { coin: <Gold20  style={styles.coin}/>, state: 11 },
    { coin: <Gold40  style={styles.coin}/>, state: 12 },
    { coin: <Gold60 style={styles.coin} />, state: 13 },
    { coin: <Gold80 style={styles.coin}/>, state: 14 },
    { coin: <Gold100  style={styles.coin}/>, state: 15 },])

  // const funcSetData = (data) => {
  //   setWordInfo(data)
  // }

  // const conditionWord = (dataWords, currentWord) => {
  //   dataWords.filter(el => {
  //     if (el.WordEn === currentWord) {
  //       return funcSetData(el)
  //     }
  //   })
  // }

  // const getWords = async (route) => {
  //   if (route.params.type === 'KNOW') {
  //     setLoading(true)
  //     let data = await getdictionaryKnow({})
  //     setLoading(false)
  //     conditionWord(data, route.params.word)
  //   } else if (route.params.type === 'LEARN') {
  //     setLoading(true)
  //     let data = await getdictionaryLearn({})
  //     setLoading(false)
  //     conditionWord(data, route.params.word)
  //   } else if (route.params.type === 'NEW') {
  //     setLoading(true)
  //     let data = await getdictionaryNew({})
  //     setLoading(false)
  //     conditionWord(data, route.params.word)
  //   }
  // }

  useEffect(() => {
    setWordInfo(route.params.word.item);
  }, [])

  // if (loading) {
  //   return (
  //     <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
  //       <Spinner />
  //     </View>
  //   )
  // }

  const getCoinIndex = item => {
    return item.length > 0 ? item[0].state : 0;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>
          {wordInfo.WordEn}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Dashboard')}
        >
          <VoidMenu
            width={windowWidth * 0.1}
            alignSelf='center'
          />

        </TouchableOpacity>
      </View>
      <View style={styles.words}>
        <View style={styles.wordpanel}>
          <Level width={5} marginRight={10} marginBottom={10} />
          <Text style={styles.word}>{wordInfo?.WordEn} - {wordInfo?.wordRus[0].WordRu}</Text>
          {coins[getCoinIndex(wordInfo.wordRus[0].loggs)]?.coin}
          
        </View>
        <Text style={styles.description}>
          "ENG - Предложение"
        </Text>
        <Text style={styles.translatedescription}>
          {wordInfo?.wordRus[0]?.hints[0]?.Hint}
        </Text>
      </View>

    </View >
  )
}

const windowDimensions = Dimensions.get('window')
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 40,
    height: 50
  },
  headerTop: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom:30,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    fontWeight: "700",
  },
  words: {
    width: '100%',
    marginTop: 20,
  },
  wordpanel: {
    width: '80%',
    flexDirection: 'row',
    // flexWrap:'wrap',
    justifyContent:'space-between',
    marginBottom: 10,
    marginLeft:10,
   
  },
  word: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "600",
    fontFamily: 'Gilroy-Regular',
  },
  description: {
    fontSize: 18,
    marginLeft: 10,
    marginTop:10
  },
  translatedescription: {
    fontSize: 18,
    color: '#929292',
    marginLeft:10,
    fontFamily: 'Gilroy-Regular',
  },
  coin:{
    width:35,
    height:35,
    marginLeft: 10,
    
  }
})
