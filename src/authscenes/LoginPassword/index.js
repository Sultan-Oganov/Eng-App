import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, Dimensions, ImageBackground } from 'react-native'
// import { multiply } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import { putData } from '../../actions/apiActions';
import { userRoutine } from '../../store/userReducer';
import buttonGradient from '../../../assets/images/buttons.png';

const LoginPassword = ({ navigation, userRoutine }) => {
    const [activeBtn, setActiveBtn] = useState(true)
    const [modal, setModal] = useState(false)
    const [pass, setPass] = useState('')
    const [repeatPass, setRepeatPass] = useState('')
    const [user, setUser] = useState();

    const resetPassword = async (password) => {
        let data = { password: password };
        const response = await putData(data);
        if (response.id) {
            setUser(response);
            setModal(true);
        } else {
            Alert.alert(response.message)
        }
    }

    const getText = (text, setState) => {
        setActiveBtn(false)
        setState(text)
    }

    const comparePassword = (first, second) => {
        if (first === second) {
            resetPassword(pass)
        } else {
            Alert.alert('Ошибка', 'Пароли не совпадают!!!')
        }
        setModal(true)
    }
    return (
        <KeyboardAwareScrollView style={styleIOS.container}>
            <ScrollView style={styleIOS.container}>
                <View>
                    <Text style={styleIOS.Hello} >
                        Сброс пароля
                    </Text>

                    <Text style={styleIOS.FastLoginSocialNetworks}>
                        Введите новый пароль
                    </Text>

                    <View style={Platform.OS == 'android' ? styleIOS.viewInput : styleIOS.viewInput}>
                        <TextInput
                            placeholder="Пароль"
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(text) => getText(text, setPass)}
                            style={Platform.OS == 'android' ? styleIOS.Input : styleIOS.Input}
                        />
                        <TextInput
                            placeholder="Пароль еще раз"
                            placeholderTextColor='#BDBDBD'
                            onChangeText={(text) => getText(text, setRepeatPass)}
                            style={Platform.OS == 'android' ? styleIOS.Input : styleIOS.Input}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        disabled={activeBtn}
                        onPress={() => comparePassword(pass, repeatPass)}
                    >
                        <ImageBackground
                            source={buttonGradient}
                            style={styleIOS.Button}
                        >
                            <Text
                                style={Platform.OS == 'android' ? styleIOS.buttonText : styleIOS.buttonText}
                            >
                                Сбросить пароль
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={styleIOS.agreementBlock}>
                        <Text style={styleIOS.agreement}>Продолжая авторизацию, вы соглашаетесь с</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Rules')}
                        >
                            <Text style={styleIOS.agreementLink}>пользовательским соглашением</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {modal ?
                    <View style={styleIOS.mainModal}>
                        <View style={Platform.OS == 'android' ? styleIOS.modalPassA : styleIOS.modalPass}>
                            <Text style={Platform.OS == 'android' ? styleIOS.modalText : styleIOS.modalText}>
                                Пароль изменен!
                            </Text>
                            <TouchableOpacity
                                onPress={() => {userRoutine({ user })}}
                                style={Platform.OS == 'android' ? styleIOS.modalClick : styleIOS.modalClick}
                            >
                                <Text style={Platform.OS == 'android' ? styleIOS.modalBtnTextA : styleIOS.modalBtnText}>
                                    Готово
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
                }

            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const windowDimensions = Dimensions.get('window')

const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styleIOS = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: "white",

    },
    mainModal: {
        position: 'absolute',
        width: '100%',
        height: '150%',
        backgroundColor: 'black',
        opacity: 0.8,
    },
    modalPass: {
        width: '70%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: '65%',
        paddingVertical: 20
    }, modalPassA: {
        width: '70%',
        height: '12%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: '65%',
    },
    modalText: {
        alignSelf: 'center',
        fontFamily: 'Gilroy-Regular',
        fontSize: 25,
        marginTop: 30,
    },
    modalClick: {
        alignSelf: 'center',
    },
    modalBtnText: {
        alignSelf: 'center',
        marginTop: 25,

        color: '#2F80ED',

    },
    modalBtnTextA: {
        alignSelf: 'center',
        marginTop: 15,
        fontSize: 20,
        color: '#2F80ED',

    },
    Hello: {
        fontFamily: 'Gilroy-Regular',
        fontSize: 18,
        fontWeight:'300',
        marginTop: '10%',
        marginLeft: '5%',
        marginBottom: '5%',
    },
    FastLoginSocialNetworks: {
        fontSize: 26,
        fontWeight:'bold',
        fontFamily: 'Gilroy-Regular',
        marginLeft: '5%',

    }, viewInput: {
        marginTop: '15%',

    },
    Input: {
        alignSelf: 'center',
        width: '90%',
        fontSize: 25,
        height: 40,
        marginTop: "20%",
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        fontFamily: 'Gilroy-Regular',
    },
    Button: {
        width: "100%",
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '30%',
    },
    ButtonFalse: {
        width: '100%',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '35%',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Gilroy-Regular',
        alignSelf: 'center',
        marginTop: -13,
        fontWeight: '700'
    },
    agreementBlock: {
        // height: 14,
        marginTop: '5%',
        alignSelf: 'center'
    },
    agreement: {
        fontSize: 13,
        textAlign: 'center',
        color: '#BDBDBD',
        width: '90%',
        fontFamily: 'Gilroy-Regular',
    },
    agreementLink: {
        fontSize: 13,
        textAlign: 'center',
        width: '90%',
        color: '#2F80ED',
        opacity: 0.6,
        fontFamily: 'Gilroy-Regular',
    }
})

const mapDispatchToProps = { userRoutine };
export default connect(null, mapDispatchToProps)(LoginPassword);
