import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight, ImageBackground, Platform } from "react-native";
import Target from "../../../../assets/images/Target.svg";
import { useNavigation } from "@react-navigation/native";
import Bronze20 from "../../../images/coins/bronze20.svg";
import Bronze40 from "../../../images/coins/bronze40.svg";
import Bronze60 from "../../../images/coins/bronze60.svg";
import Bronze80 from "../../../images/coins/bronze80.svg";
import Bronze100 from "../../../images/coins/bronze100.svg";
import Silver20 from "../../../images/coins/silver20.svg";
import Silver40 from "../../../images/coins/silver40.svg";
import Silver60 from "../../../images/coins/silver60.svg";
import Silver80 from "../../../images/coins/silver80.svg";
import Silver100 from "../../../images/coins/silver100.svg";
import Gold20 from "../../../images/coins/ggold20.svg";
import Gold40 from "../../../images/coins/ggold40.svg";
import Gold60 from "../../../images/coins/ggold60.svg";
import Gold80 from "../../../images/coins/ggold80.svg";
import Gold100 from "../../../images/coins/ggold100.svg";
import Spinner from "../../../Spinner";
import { SwipeListView } from "react-native-swipe-list-view";
import buttonGradient from '../../../../assets/images/buttons.png';

const ITEM_HEIGHT = 60;

export default Learning = ({ words, current, listener, diapazon, wordToNew, wordToKnow }) => {
  const navigation = useNavigation();
  const [coins] = useState([
    { coin: <Bronze20 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 1 },
    { coin: <Bronze40 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 2 },
    { coin: <Bronze60 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 3 },
    { coin: <Bronze80 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 4 },
    { coin: <Bronze100 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 5 },
    { coin: <Silver20 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 6 },
    { coin: <Silver40 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 7 },
    { coin: <Silver60 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 8 },
    { coin: <Silver80 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 9 },
    { coin: <Silver100 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 10 },
    { coin: <Gold20 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 11 },
    { coin: <Gold40 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 12 },
    { coin: <Gold60 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 13 },
    { coin: <Gold80 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 14 },
    { coin: <Gold100 style={{ width: 40, height: 40, alignSelf: 'center' }} />, state: 15 },
  ])
  const [textIndex, setTextIndex] = useState(-1);
  const [text, setText] = useState(words.map(() => (false)));

  useEffect(() => {
    return () => {
      listener(1);
    };
  }, []);

  const setsetText = (index, value) => {
    if (textIndex >= 0) {
      text[textIndex] = false;
    }
    text[index] = value;
    setText(text);
    setTextIndex(value ? index : -1);
  }

  const changeItemKnow = (_rowMap, rowKey) => {
    wordToKnow(rowKey);
  };

  const changeItemNew = (_rowMap, rowKey) => {
    wordToNew(rowKey);
  };

  // const onItemOpen = (rowKey) => {
  //   console.log("This row opened", rowKey);
  // };

  const getCoinIndex = item => {
    return item.length > 0 ? item[0].state : 0;
  }

  const renderItem = (data) => {
    return (
      <View>
        <TouchableHighlight
          onLongPress={() => navigation.navigate('TestingDetail', { word: data })}
          onPress={() => {
            setsetText(data.index, true);
            setTimeout(() => setsetText(data.index, false), 1000);
          }}
          style={[styles.rowFront, text[data.index] === true ? { backgroundColor: '#2A80F1' } : {}]}
          underlayColor={"white"}
        >
          <View style={styles.resultCoins1}>
            <View style={styles.resultCoins}>
              <Text style={[styles.resultText1, text[data.index] === true ? { color: 'white' } : {}]}>
                {data.item.WordEn}
                {" - "}
              </Text>
              <Text style={[styles.resultText2, text[data.index] === true ? { color: 'white' } : {}]}>
                {data.item.wordRus[0].WordRu}
              </Text>
            </View>
            {coins[getCoinIndex(data.item.wordRus[0].loggs)]?.coin}
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => changeItemKnow(rowMap, data.item.id)}
      >
        <Text style={styles.btnText}>Знаю → </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => changeItemNew(rowMap, data.item.id)}
      >
        <Text style={styles.btnText1}> ← Отложить</Text>
      </TouchableOpacity>
    </View>
  );

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      try {
        diapazon(viewableItems[0].index, viewableItems[viewableItems.length - 1].index);
      } catch (e) { }
    }
  })

  return (
    words.length === 0
      ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </View>
      : <View>
        <View style={styles.container} key={current}>
          <SwipeListView
            useFlatList={true}
            data={words}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={150}
            rightOpenValue={-150}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={30}
            // onRowDidOpen={onItemOpen}
            initialNumToRender={10}
            initialScrollIndex={current}
            keyExtractor={item => item.id}
            getItemLayout={(_data, index) => (
              { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            itemVisiblePercentThreshold={75}
            onViewableItemsChanged={onViewRef.current}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("TrainingLoaderScreen")}
          style={{paddingTop: '1%', }}
        >
          <ImageBackground source={buttonGradient} style={styles.trainingButton}>
            <Target style={styles.exerciseImage} />
            <Text style={styles.exerciseText}>Тренироваться</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: '78%'
  },
  resultWords: {
    marginTop: 5,
    fontSize: 22,
    fontFamily: "Gilroy-Regular",
  },
  resultCoins: {
    flexDirection: "row",
    marginLeft: 0,
    marginRight: 20,
    width: '90%'
  },
  resultCoins1: {
    flexDirection: "row",
    width: '80%',
    marginRight: 40,
  
  },
  resultText1: {
    alignSelf: "center",
    fontSize: 20,
    color: "#1D1F21",
    fontFamily: "Gilroy-Regular",
    fontWeight: "700",
    
  },
  resultText2: {
    alignSelf: "center",
    fontSize: 20,
    color: "#1D1F21",
    fontFamily: "Gilroy-Regular",
    textAlign: "left",
    width: '80%'
  },
  trainingButton: {
    width: '100%',
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom:20,
    marginTop:-10
  },
  exerciseImage: {
    width: 15,
    height: 15,
    marginRight: 10,
    alignSelf: "center",
    marginTop: -13,

  },
  exerciseText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Gilroy-Regular',
    marginTop: -10,
    fontWeight:'700'
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    height: ITEM_HEIGHT
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 150,
  },
  closeBtn: {
    left: 0,
  },
  deleteBtn: {
    right: 0,
  },
  btnText:{
    fontSize:18,
color:"#219653"
  },
  btnText1:{
    fontSize:18,
color:"#EB5757"
  }
});
