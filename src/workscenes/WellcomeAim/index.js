import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, ImageBackground } from "react-native";
import sensei from "../../images/sensei.png";
import buttonGradient from '../../../assets/images/buttons.png';
import { userDataRoutine } from "../../store/userReducer";
import { writeUser } from '../../actions/apiActions';

function WellcomeAim({ navigation, user, userDataRoutine }) {

  const setUserAim = async value => {
    user.status = value;
    userDataRoutine({ user })
    writeUser(user);
    navigation.navigate('Start');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.iknow}>Я сам все знаю</Text>
      <Image source={sensei} style={styles.master} />
      <View style={styles.words}>
        <Text style={styles.title}>Что привело тебя сюда ?</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => setUserAim('Нужно по учебе')}>
          <ImageBackground source={buttonGradient} style={styles.trainingButton} >
            <Text style={styles.buttonText}>Нужно по учебе</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserAim('За гранцей работа лучше')} >
          <ImageBackground source={buttonGradient} style={styles.trainingButton} >
            <Text style={styles.buttonText}>За гранцей работа лучше</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserAim('Хочу путешествовать')} >
          <ImageBackground source={buttonGradient} style={styles.trainingButton} >
            <Text style={styles.buttonText}>Хочу путешествовать</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserAim('Для общего развиия')} >
          <ImageBackground source={buttonGradient} style={styles.trainingButton} >
            <Text style={styles.buttonText}>Для общего развиия</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
        marginTop: 70,
        fontFamily: 'Gilroy-Regular',
        fontWeight: '700',
        marginBottom: 20,
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
        marginTop: '0%',
        width:'100%'
    }
})

WellcomeAim.propTypes = {
  user: PropTypes.object,
};

WellcomeAim.defaultProps = {
  user: {}
};

const mapStateToProps = ({ users }) => ({
  user: users.user
});

const mapDispatchToProps = { userDataRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(WellcomeAim);
