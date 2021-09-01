import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions, ImageBackground } from "react-native";
import { setData } from "../../AsyncStorage/AsyncStorage";
import { emailReset } from '../../actions/apiActions';
import buttonGradient from '../../../assets/images/buttons.png';

const LoginChange = ({ navigation, mail }) => {

  const [button, setButton] = useState(false);
  const [email, setEmail] = useState(mail)
  const [code, setCode] = useState()

  const codeConfirm = async (email, code) => {
    let data = {
      email,
      kode: code
    };
    const response = await emailReset(data);
    if (response.token) {
      setData(response.token)
      navigation.navigate('LoginPassword')
    } else {
      Alert.alert(' ', response.message)
    }
  };

  const changeButton = () => {
    email !== '' && code !== '' ? setButton(true) : setButton(false)
  }

  const getText = (text, setState) => {
    setState(text)
    changeButton(text)
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
        Введите адрес электронной почты и код, отправленый на Вашу почту
      </Text>

      <TextInput
        onChangeText={(text) => {
          getText(text, setEmail)
        }}
        value={email}
        placeholder="Адрес электронной почты "
        placeholderTextColor='#BDBDBD'
        style={Platform.OS == "android" ? styleIOS.Input : styleIOS.Input}
      />

      <TextInput
        onChangeText={(text) => {
          getText(text, setCode)
        }}
        placeholder="Код подтверждения "
        placeholderTextColor='#BDBDBD'
        style={Platform.OS == "android" ? styleIOS.Input1 : styleIOS.Input1}
      />

      <TouchableOpacity onPress={() => codeConfirm(email, code)}>
        <ImageBackground
          source={buttonGradient}
          style={
            button == true ?
              styleIOS.Button : styleIOS.ButtonFalse
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
    fontSize: 20,
    marginTop: "5%",
    marginLeft: "5%",
    marginBottom: "5%",

    // color:'silver',
  },
  FastLoginSocialNetworks: {
    fontSize: 25,
    fontFamily: 'Gilroy-Regular',
    marginLeft: "5%",
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
  Input1: {
    alignSelf: "center",
    width: "90%",
    fontSize: windowWidth * 0.06,
    height: 40,
    marginTop: "10%",
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
    marginTop: "50%",
    marginBottom: '15%'
  },
  ButtonFalse: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: "50%",
    opacity: 0.6,
    marginBottom: '15%'
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontFamily: 'Gilroy-Regular',
    alignSelf: "center",
    marginTop: -7,
    fontWeight: '700'
  },
});

LoginChange.propTypes = {
  mail: PropTypes.string
};

const mapStateToProps = ({ users }) => ({
  mail: users.email
});

export default connect(mapStateToProps)(LoginChange);
