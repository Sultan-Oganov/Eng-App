import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, StyleSheet, ImageBackground, } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import VoidMenu from '../../../images/voidMenu.svg'
import CheckTrue from '../../../images/check.svg'
import buttonGradient from '../../../../assets/images/buttons.png';

export default function TrainingMistake({ navigation }) {

  const [englishWords, setEnglishWords] = useState(false)
  const [translate, setTranslate] = useState(false)
  const [voiceActing, setVoiceActing] = useState(false)
  const [contextHints, setContextHints] = useState(false)
  const [other, setOther] = useState(false)

  const changeEnglishWords = () => {
    englishWords == true ? setEnglishWords(false) : setEnglishWords(true)
  }
  const changeTranslate = () => {
    translate == true ? setTranslate(false) : setTranslate(true)
  }
  const changeVoiceActing = () => {
    voiceActing == true ? setVoiceActing(false) : setVoiceActing(true)
  }
  const changeContextHints = () => {
    contextHints == true ? setContextHints(false) : setContextHints(true)
  }
  const changeOther = () => {
    other == true ? setOther(false) : setOther(true)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>
          Проблема с:
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TrainingsScreen')}
        >
          <VoidMenu
            style={styles.headerExitWorkout}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.poins}>
        <TouchableOpacity
          style={styles.pointContainer}
          onPress={() => changeEnglishWords()}
        >
          {englishWords == false ?
            <TouchableOpacity
              onPress={() => changeEnglishWords()}
              style={styles.pointNonActive}
            >
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => changeEnglishWords()}
              style={styles.pointActive}
            >
              <CheckTrue
                style={styles.checkTrueImg}
              />

            </TouchableOpacity>
          }

          <Text style={styles.pointText}>
            Английским словом/фразой
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pointContainer}
          onPress={() => changeTranslate()}
        >
          {translate == false ?
            <TouchableOpacity
              style={styles.pointNonActive}
              onPress={() => changeTranslate()}
            >
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.pointActive}
              onPress={() => changeTranslate()}
            >
              <CheckTrue
                style={styles.checkTrueImg}
              />

            </TouchableOpacity>
          }

          <Text style={styles.pointText}>
            Переводом
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pointContainer}
          onPress={() => changeVoiceActing()}
        >
          {voiceActing == false ?
            <TouchableOpacity
              onPress={() => changeVoiceActing()}
              style={styles.pointNonActive}
            >
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => changeVoiceActing()}
              style={styles.pointActive}
            >
              <CheckTrue
                style={styles.checkTrueImg}
              />

            </TouchableOpacity>
          }

          <Text style={styles.pointText}>
            Озвучкой
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pointContainer}
          onPress={() => changeContextHints()}
        >
          {contextHints == false ?
            <TouchableOpacity
              style={styles.pointNonActive}
              onPress={() => changeContextHints()}
            >
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.pointActive}
              onPress={() => changeContextHints()}
            >
              <CheckTrue
                style={styles.checkTrueImg}
              />

            </TouchableOpacity>
          }

          <Text style={styles.pointText}>
            Контекстными подсказками
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pointContainer}
          onPress={() => changeOther()}
        >
          {other == false ?
            <TouchableOpacity
              style={styles.pointNonActive}
              onPress={() => changeOther()}
            >
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.pointActive}
              onPress={() => changeOther()}
            >
              <CheckTrue
                style={styles.checkTrueImg}
              />

            </TouchableOpacity>
          }

          <Text style={styles.pointText}>
            Другое
          </Text>
        </TouchableOpacity>

      </View>
      <View style={styles.commentBox}>
        <TextInput
          style={styles.comment}
          multiline
          placeholder={
            'Здесь вы можете оставить свой комментарий ...'
          }
          placeholderTextColor='#828282'
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TrainingsScreen')}>
        <ImageBackground
          source={buttonGradient}
          style={styles.trainingButton}
        >
          <Text style={styles.buttonText}>Отправить</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ScrollView>
  )
}
const windowDimensions = Dimensions.get('window')

export const windowWidth = windowDimensions.width;
export const windowHeight = windowDimensions.height;

const isLongDevices = isIphoneX()


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: windowWidth * 0.04,
    paddingTop: isLongDevices ? windowWidth * 0.12 : windowWidth * 0.05,
    alignSelf: 'center',
  },
  headerTitle: ({
    color: 'black',
    fontSize: windowWidth * 0.06,
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
  }),
  headerExitWorkout: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    alignSelf: 'center'
  },
  headerTop: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: 325,
    marginBottom: windowWidth * 0.05,
    paddingTop: windowHeight * 0.03,
  },
  poins: ({
    width: '90%',
  }),
  pointContainer: ({
    flexDirection: 'row',
    marginBottom: windowWidth * 0.025,
  }),
  pointActive: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 30,
  },
  pointNonActive: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    borderColor: '#828282',
    borderWidth: 2,
    borderRadius: 30,
  },
  checkTrueImg: {
    marginTop: '15%',
    alignSelf: 'center'
  },
  pointText: {
    marginLeft: '5%',
    fontFamily: 'Gilroy-Regular',
    fontSize: windowWidth * 0.05,
  },
  commentBox: {
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 20,
  },
  comment: {
    fontSize: windowWidth * 0.04,
    width: '80%',
    height: windowWidth * 0.51,
    textAlign: 'center',
    alignSelf: 'center'
  },
  trainingButton: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: windowHeight * 0.05,

   
  },
  buttonText: {
    fontSize:18,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Gilroy-Regular',
    fontWeight:'700',
    marginTop: -13
  },

})