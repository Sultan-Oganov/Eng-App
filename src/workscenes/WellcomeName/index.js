import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, TextInput, ImageBackground } from "react-native";
import sensei from "../../images/sensei.png";
import buttonGradient from '../../../assets/images/buttons.png';
import { userDataRoutine } from "../../store/userReducer";

function WellcomeName({ navigation, user, userDataRoutine }) {
  const [ownname, userNameValue] = useState(user.ownname);
  
  const setUserName = () => {
    user.ownname = ownname;
    userDataRoutine({ user })
    navigation.navigate('WellcomeAge');
  }

  const input = useRef();
  useEffect(() => {
    setTimeout(() => input.current.focus(), 10);
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.iknow}>Я сам все знаю</Text>
        <Image source={sensei} style={styles.master} />
        <Text style={styles.title}>Как тебя зовут ?</Text>
        <View style={styles.contentMainDeviderContainer}>
          <TextInput
            ref={input}
            value={ownname}
            onChangeText={(text) => userNameValue(text)}
            style={styles.contentMainWordTranslate}
            placeholder='Имя'
            onSubmitEditing={setUserName}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={setUserName} >
            <ImageBackground source={buttonGradient} style={styles.trainingButton} >
              <Text style={styles.buttonText}>Меня зовут</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  contentMainDeviderContainer: ({
    height: windowWidth * 0.32,
    alignItems: 'center',
    justifyContent: 'center',

  }),
  contentMainWordTranslate: {
    color: '#2A80F1',
    fontFamily: 'Gilroy-Regular',
    fontSize: 24,
    alignSelf: 'center',
    borderBottomColor: '#2A80F1',
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',

  },
  contentMainDeviderTranslateContainer: {
    height: windowWidth * 0.32,
    alignItems: 'center',
    backgroundColor:'#2A80F1'
  },
  contentMainDevider: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.0025,
    backgroundColor: '#BDBDBD',
    marginHorizontal: windowWidth * 0.15,
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
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.1,
    fontFamily: 'Gilroy-Regular',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    width: '95%',
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
    marginTop: -20,
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
    marginTop: '20%',
    width:'100%'
  }
});

WellcomeName.propTypes = {
  user: PropTypes.object,
};

WellcomeName.defaultProps = {
  user: {}
};

const mapStateToProps = ({ users }) => ({
  user: users.user
});

const mapDispatchToProps = { userDataRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(WellcomeName);
