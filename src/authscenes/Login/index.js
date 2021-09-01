import React, { useState, useRef } from "react";
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, Platform, StyleSheet, ScrollView, ImageBackground, Dimensions, KeyboardAvoidingView } from "react-native";
import WebView from 'react-native-webview';
import queryString from 'query-string';
import Vk from "../../images/vk.svg";
import Fb from "../../images/facebook.svg";
import Google from "../../images/google.svg";
import Eye from '../../../assets/images/Eye.svg'
import NoEye from '../../../assets/images/hide.svg'
import { setData } from "../../AsyncStorage/AsyncStorage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../../actions/apiActions';
import { userRoutine } from '../../store/userReducer';
import Spinner from '../../Spinner';
import buttonGradient from '../../../assets/images/buttons.png';

const Login = ({ navigation, userRoutine }) => {
    const [secretPass, setSecretPass] = useState(true);
    const [errorInput, setErrorInput] = useState(true);
    const [errorButton, setErrorButton] = useState(true)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const [mode, setMode] = useState(false);
    const [url, setUrl] = useState();

    const handleChange = () => {
        secretPass == true ? setSecretPass(false) : setSecretPass(true);
    };

    const signin = async (email, password) => {
        setIsLogin(true);
        let data = {
            password,
            email,
        };
        setInfo(data);
        const response = await login(data);
        setIsLogin(false);
        if (await response?.message) {
            setErrorInput(false)
        } else {
            const { user } = response;
            setData(response.token)
            userRoutine({ user });
        }
    };

    const changeButton = () => {
        email !== '' && password !== '' ? setErrorButton(false) : setErrorButton(true)
    }
    const getText = (text, setState) => {
        setState(text)
        changeButton(text)
    }

    const passwordRef = useRef();
    const onLoginSubmit = () => {
        passwordRef.current.focus();
    }
    const onPasswordSubmit = () => {
        signin(email, password);
    }

    const httpParce = (value) => {
        const index = value.indexOf('?');
        const vData = value.substr(index + 1).split('&');
        result = { address: value.substr(0, index) };
        vData.forEach(item => {
            const itemData = queryString.parse(item);
            const key = Object.keys(itemData)[0];
            result[key] = itemData[key];
        })
        return result;
    }
    const ask = async (point) => {
        setMode(false);
        setIsLogin(true);
        const ress = await fetch(point, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        const response = await ress.json();
        setIsLogin(false);
        if (await response?.message) {
            setErrorInput(false)
        } else {
            const { user } = response;
            setData(response.token)
            userRoutine({ user });
        }
    }
    const corrAddress = value => {
        const index = value.lastIndexOf('/');
        return value.substr(0, index) + '/login';
    }
    const handleWebViewChange = async (newNavState) => {
        const { url, loading } = newNavState;
        if (url.includes('/login?code') || url.includes('/register?code')) {
            const { address, code } = httpParce(url);
            const query = `code=${code}`;
            const newUrl = corrAddress(address) + `?${query}`;
            if (loading) {
                try {
                    ask(newUrl);
                } catch (error) {
                }
            }
        }
    }

    const goLogin = 'https://dict-server.herokuapp.com/api/auth/google?login';
    const fbLogin = 'https://dict-server.herokuapp.com/api/auth/facebook?login';
    const vkLogin = 'https://dict-server.herokuapp.com/api/auth/vkontakte?login';

    const handleGoogleLogin = () => {
        setUrl(goLogin);
        setMode(true);
    }
    const handleFacebookLogin = () => {
        setUrl(fbLogin);
        setMode(true);
    }
    const handleVkLogin = () => {
        setUrl(vkLogin);
        setMode(true);
    }

    return (
        mode
            ? <View style={styleIOS.topcontainer}>
                <WebView
                    source={{ uri: url }}
                    userAgent="Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
                    originWhitelist={["https://*", "http://*", "file://*", "sms://*"]}
                    onNavigationStateChange={handleWebViewChange}
                />
            </View>
            : <KeyboardAwareScrollView style={Platform.OS == "android" ? styleIOS.container : styleIOS.container}>
                <ScrollView style={Platform.OS == "android" ? styleIOS.container : styleIOS.container}>
                    <Text style={Platform.OS == "android" ? styleIOS.Hello : styleIOS.Hello}>
                        Добро пожаловать
                    </Text>
                    {isLogin
                        ? <View style={styleIOS.Spinner}>
                            <Spinner />
                        </View>
                        : <View>
                            <Text
                                style={
                                    Platform.OS == "android"
                                        ? styleIOS.FastLoginSocialNetworks
                                        : styleIOS.FastLoginSocialNetworks
                                }
                            >
                                Быстрый вход через социальные сети:
                            </Text>
                            <View
                                style={
                                    Platform.OS == "android"
                                        ? styleIOS.SocialNetworks
                                        : styleIOS.SocialNetworks
                                }
                            >
                                <TouchableOpacity onPress={handleVkLogin}>
                                    <Vk/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleFacebookLogin}>
                                    <Fb/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleGoogleLogin}>
                                    <Google/>
                                </TouchableOpacity>
                            </View>
                            <Text style={Platform.OS == "android" ? styleIOS.Or : styleIOS.Or}>
                                или
                            </Text>
                            <Text style={Platform.OS == "android" ? styleIOS.OnEmail : styleIOS.OnEmail}>
                            Через электронную почту
                            </Text>
                        </View>}

                    <TextInput
                        onChangeText={(text) => { getText(text, setEmail) }}
                        placeholder="Электронная почта "
                        placeholderTextColor='#BDBDBD'
                        style={Platform.OS == "android" ? styleIOS.Input : styleIOS.Input}
                        keyboardType='email-address'
                        onSubmitEditing={onLoginSubmit}
                    />
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                        <TextInput
                            onChangeText={(text) => { getText(text, setPassword) }}
                            placeholder="     Пароль "
                            placeholderTextColor='#BDBDBD'
                            style={
                                Platform.OS == "android" ? styleIOS.InputPass : styleIOS.InputPass
                            }
                            secureTextEntry={secretPass}
                            ref={passwordRef}
                            onSubmitEditing={onPasswordSubmit}
                        />
                        <TouchableOpacity onPress={() => handleChange()}>
                            {secretPass == true
                                ? <NoEye style={{ marginTop: windowHeight * 0.06, width: 24, height: 24 }} />
                                : <Eye style={{ marginTop: windowHeight * 0.06, width: 24, height: 24 }} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'90%', height:1,backgroundColor:'green',alignSelf:'center', }} ></View>

                    {errorInput == false ? (
                        <Text
                            style={
                                Platform.OS == "android" ? styleIOS.errorCod : styleIOS.errorCod
                            }
                        >
                            Неверный адрес электронной почты или пароль, попробуйте еще раз
                        </Text>
                    ) : null}

                    {errorButton == true
                        ? <TouchableOpacity
                            onPress={() => {
                                signin(email, password);
                            }}
                        >
                            <ImageBackground
                                source={buttonGradient}
                                style={Platform.OS == "android" ? styleIOS.Button : styleIOS.Button}
                            >
                                <Text
                                    style={
                                        Platform.OS == "android"
                                            ? styleIOS.buttonTextA
                                            : styleIOS.buttonText
                                    }
                                >
                                    Войти
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        : <TouchableOpacity
                            onPress={() => {
                                signin(email, password);

                            }}
                        >
                            <ImageBackground
                                source={buttonGradient}
                                style={
                                    Platform.OS == "android"
                                        ? styleIOS.ButtonErrFalse
                                        : styleIOS.ButtonErrFalse
                                }
                            >
                                <Text
                                    style={
                                        Platform.OS == "android"
                                            ? styleIOS.buttonText
                                            : styleIOS.buttonText
                                    }
                                >
                                    Войти
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => navigation.navigate("LoginPassword")}>
                        <Text
                            style={
                                Platform.OS == "android" ? styleIOS.forgotPass : styleIOS.forgotPass
                            }
                        >
                            Забыл пароль ?
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAwareScrollView>
    );
}

const windowDimensions = Dimensions.get('window')

const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styleIOS = StyleSheet.create({
    topcontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: windowHeight
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    Spinner: {
        fontSize: windowWidth * 0.05,
        marginTop: windowHeight * 0.15,
        marginBottom: windowHeight * 0.12,
        marginLeft: windowWidth * 0.05,
    },
    Hello: {
        fontSize:18,    
        fontFamily: 'Gilroy-Regular',
        fontWeight:'300',
        marginTop: windowHeight * 0.02,
        marginLeft: windowWidth * 0.05,
        // color:'silver',
    },
    FastLoginSocialNetworks: {
        fontSize: 26,
        fontFamily: 'Gilroy-Regular',
        marginTop: 10,
        marginLeft: "5%",
        fontWeight: 'bold'
    },
    SocialNetworks: {
        backgroundColor: "white",
        width: "70%",
        marginLeft: "15%",
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    Or: {
        alignSelf: "center",
        marginTop: 40,
        fontFamily: 'Gilroy-Regular',
        fontSize: windowWidth * 0.056,
    },
    OnEmail: {
        fontFamily: 'Gilroy-Regular',
        fontSize: 26,
        marginLeft: "5%",
        marginTop: windowHeight * 0.04,
        fontWeight: 'bold'
    },
    Input: {
        alignSelf: "center",
        width: "90%",
        fontSize: windowWidth * 0.06,

        height: 40,
        marginTop: "10%",
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "green",
    },
    InputPass: {
        alignSelf: "center",
        width: "82%",
        fontSize: windowWidth * 0.06,
        height: 40,
        marginTop: "10%",
        textAlign: "center",
    },
    Button: {
        width: '100%',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '4%',
        marginTop: windowHeight * 0.07,
        opacity: 0.6,
    },
    ButtonErrFalse: {
        width: '100%',
        height: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '4%',
        marginTop: windowHeight * 0.06,
    },
    buttonTextA: {
        fontSize: 18,
        color: "white",
        fontFamily: 'Gilroy-Regular',
        fontWeight:'700',
        alignSelf: "center",
        marginTop: -11,
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        fontFamily: 'Gilroy-Regular',
        fontWeight:'700',
        alignSelf: "center",
        marginTop: -8,
    },
    forgotPass: {
        color: "#2F80ED",
        textAlign: "center",
        marginBottom: windowHeight * 0.02,
        fontSize: 17,
        fontFamily: 'Gilroy-Regular',
    },
    errorCod: {
        color: "red",
        textAlign: "center",
        fontSize: windowWidth * 0.04,
        marginTop: windowHeight * 0.02,
    },
});

const mapDispatchToProps = { userRoutine };
export default connect(null, mapDispatchToProps)(Login);
