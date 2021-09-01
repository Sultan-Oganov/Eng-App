import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, ImageBackground, View } from 'react-native'
import sensei from '../../images/sensei.png'

import buttonGradient from '../../../assets/images/buttons.png';


export default function Start({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Image source={sensei} style={styles.master} />
            <View style={styles.words}>
                <Text style={styles.title}>
                    На что ты способен?
                </Text>
                <Text style={styles.subTitle}>
                    Покажи какие слова ты уже знаешь, а какие еще нет. Это нужно мне для создания индивидуального плана обучения для тебя.
                </Text>
            </View>
            <View style={styles.buttons}>
            <TouchableOpacity onPress={() => navigation.navigate('Testing')}>
                <ImageBackground source={buttonGradient} style={styles.trainingButton} >
                    <Text style={styles.buttonText}>Начать</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancell} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.buttonText1}>Пропустить</Text>
            </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const windowDimensions = Dimensions.get('window')
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    master: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.3,
        alignSelf: 'center',
        marginTop: windowHeight * 0.14,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        marginBottom: windowHeight * 0.01,
        marginTop: windowHeight * 0.1,
        fontFamily: 'Gilroy-Regular',
        fontWeight: '700',
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        width: '90%',
        marginLeft: windowWidth * 0.05,
        fontFamily: 'Gilroy-Regular',
        marginBottom: 5,

    },
    iknow: {
        fontSize: 16,
        textAlign: 'center',
        color: '#828282',
        fontFamily: 'Gilroy-Regular',
        marginTop: windowHeight * 0.04,
        width: '90%',
        marginLeft: windowWidth * 0.3
    },
    words:{
width:'100%'
    },
    trainingButton: {
        width:'100%',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: -10,
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        lineHeight: windowWidth * 0.06,
        alignSelf: 'center',
        fontFamily: 'Gilroy-Regular',
        marginTop: -7,
        fontWeight:'700'
    },
    buttons:{
        marginTop: '10%',
        width:'100%'
    },


    buttonCancell: {
      borderColor: '#2A80F1',
      borderWidth: 1,
      width: '90%',
      height: 47,
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 49,
      alignItems: 'center',
      flexDirection: 'row',
      color: '#2A80F1',
      backgroundColor: '#fff',
    },
  
    buttonText1: {
      fontSize: 18,
      color: '#2A80F1',
      lineHeight: windowWidth * 0.06,
      alignSelf: 'center',
      fontFamily: 'Gilroy-Regular',
      margin: 0,
    },
  });
