import React, { useState } from "react";
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions, ImageBackground } from "react-native";
import { emailReset } from '../../actions/apiActions';
import { emailRoutine } from '../../store/userReducer';
import buttonGradient from '../../../assets/images/buttons.png';

const LoginEmail = ({ navigation, emailRoutine }) => {
  const [button, setButton] = useState(false);
  const [email, setEmail] = useState()
  const [validate, setValidate] = useState({
    email: '',
    validated: false
  })

  const resetPassword = async (text) => {
    // setLoader(true)
    let data = {
      email: text,
    };
    const response = await emailReset(data);
    if (response.status === 200) {
      emailRoutine({ email: text })
      navigation.navigate("LoginChange")
    } else {
      Alert.alert('Error', response.message)
    }
  };

  const checkEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;;
    if (reg.test(text) === false) {
      Alert.alert("Не правильный электронный адрес ", 'Введите действительный адрес @Эл.Почты ');
      return false;
    }
    else {
      setValidate({ email: text, validated: true })
      resetPassword(text)
    }
  }

  const changeButtom = () => {
    email == '' || email == null || email == undefined ? setButton(false) : setButton(true)
  }

  const getText = (text) => {
    setEmail(text)
    changeButtom(text)
  }

  return (
    <ScrollView
      style={Platform.OS == "android" ? styleIOS.container : styleIOS.container}
    >
      <Text style={Platform.OS == "android" ? styleIOS.Hello : styleIOS.Hello}>
        Сброс пароля
      </Text>

      <Text
        style={
          Platform.OS == "android"
            ? styleIOS.FastLoginSocialNetworks
            : styleIOS.FastLoginSocialNetworks
        }
      >
        Введите адрес электронной почты, мы вышлем Вам код подтверждения
      </Text>

      <TextInput
       onChangeText={(text) => getText(text)}
        placeholder="Адрес электронной почты "
        placeholderTextColor= '#BDBDBD'
        style={Platform.OS == "android" ? styleIOS.Input : styleIOS.Input}
      />

      {button == false ? (
        <TouchableOpacity disabled={true}>
          <ImageBackground
            source={buttonGradient}
            style={
              Platform.OS == "android"
                ? styleIOS.ButtonFalse
                : styleIOS.ButtonFalse
            }
          >
            <Text
              style={
                Platform.OS == "android"
                  ? styleIOS.buttonText
                  : styleIOS.buttonText
              }
            >
              Отправить код
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => checkEmail(email)}>
          <ImageBackground
            source={buttonGradient}
            style={
              Platform.OS == "android"
                ? styleIOS.Button
                : styleIOS.Button
            }
            colors={['#2DB5FE', '#5067FB']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
          >
            <Text
              style={
                Platform.OS == "android"
                  ? styleIOS.buttonText
                  : styleIOS.buttonText
              }
            >
              Отправить код
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      )
      }
    </ScrollView>
  );
}
const windowDimensions = Dimensions.get('window')

const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styleIOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Hello: {
    fontFamily: 'Gilroy-Regular',
    fontSize: windowWidth * 0.05,
    marginTop: windowHeight * 0.02,
    marginLeft: windowWidth * 0.05,

    // color:'silver',
  },
  FastLoginSocialNetworks: {
    fontSize: 26,
    fontFamily: 'Gilroy-Regular',
    marginLeft: "5%",
    marginTop: '2%',
    
    fontWeight: 'bold',
    width: windowWidth * 0.9
  },
  Input: {
    alignSelf: "center",
    width: "90%",
    fontSize: windowWidth * 0.06,
    height: 40,
    marginTop: "30%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  Button: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: "60%",
    marginBottom: '12%',
  },
  ButtonFalse: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: "60%",
    marginBottom: '12%',
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: 'Gilroy-Regular',
    alignSelf: "center",
    marginTop: -13,
    fontWeight: '700'
  },
});

const mapDispatchToProps = { emailRoutine };
export default connect(null, mapDispatchToProps)(LoginEmail);
