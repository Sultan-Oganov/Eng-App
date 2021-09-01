import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform, SafeAreaView, ImageBackground } from 'react-native'
import sensei from '../../images/sensei.png';
import buttonGradient from '../../../assets/images/buttons.png';

export default function WellcomeWAU({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.iknow}>Я сам все знаю</Text>
            <Image
                source={sensei}
                style={styles.master}
            />
             <View style={styles.words}>
            <Text style={styles.title}>
                Я твой сенсей
            </Text>
            <Text style={styles.subTitle}>
                Моя задача помогать тебе на всем пути познания, основ английского языка.
                Проходи испытания, получай награды и ты станешь настоящим ниндзя
            </Text></View>

            <View style={styles.buttons}>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('WellcomeSex')}>
                <ImageBackground
                    source={buttonGradient}
                    style={styles.trainingButton}
                >
                    <Text style={styles.buttonText}>Понял</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('WellcomeEng')}>
                <ImageBackground
                    source={buttonGradient}
                    style={styles.trainingButton}
                >
                    <Text style={styles.buttonText}>Ниндзя ? Английский ?</Text>
                </ImageBackground>
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
        marginTop: windowHeight * 0.08,
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
        marginBottom: 25,
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
        marginTop: '7%',
        width:'100%'
    }

})
