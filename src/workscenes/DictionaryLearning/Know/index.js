import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import Coin from "../../../../assets/images/Coin5.svg";
import Spinner from "../../../Spinner";
import { EventRegister } from 'react-native-event-listeners';

const ITEM_HEIGHT = 60;

export default Know = ({ words, current, listener, diapazon, wordToLearn }) => {
  const navigation = useNavigation();
  const [textIndex, setTextIndex] = useState(-1);
  const [text, setText] = useState(words.map(() => (false)));

  useEffect(() => {
    return () => {
      listener(2);
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

  const changeItem = (_rowMap, rowKey) => {
    wordToLearn(rowKey);
  };
  // const onItemOpen = (rowKey) => {
  //   console.log("This row opened", rowKey);
  // };

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
            <Coin style={styles.coin} />
          </View>
      </TouchableHighlight>
    </View >
  )};

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => closeItem(rowMap, data.item.key)}
      >
        <Text style={styles.btnText}>Знаю → </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => changeItem(rowMap, data.item.id)}
      >
        <Text style={styles.btnText1}> ← Учить</Text>
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
      : <View key={current} >
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  resultWords: {
    marginTop: 5,
    fontSize: 22,
    fontFamily: "Gilroy-Regular",
  },
  resultCoins: {
    flexDirection: "row",
    width: 270,
    marginLeft: 0,
    marginRight: 20,
  },
  resultCoins1: {
    flexDirection: "row",
    width: 290,
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
    width: '70%'
  },
  coin: {
    alignSelf: "center",
  },

  rowFront: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    height: ITEM_HEIGHT,
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
