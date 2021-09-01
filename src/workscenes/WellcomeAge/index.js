import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import sensei from "../../images/sensei.png";
import buttonGradient from '../../../assets/images/buttons.png';
import { userDataRoutine } from "../../store/userReducer";

function WellcomeAge({ navigation, user, userDataRoutine }) {

  const setUserAge = value => {
    user.age = value;
    userDataRoutine({ user })
    navigation.navigate('WellcomeAim');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.iknow}>Я сам все знаю</Text>
        <Image source={sensei} style={styles.master} />
        <View style={styles.words}>
          <Text style={styles.title}>Сколько тебе лет ?</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => setUserAge('3 - 14')}>
            <ImageBackground source={buttonGradient} style={styles.trainingButton} >
              <Text style={styles.buttonText}>3 - 14</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserAge('14 - 18')}>
            <ImageBackground source={buttonGradient} style={styles.trainingButton} >
              <Text style={styles.buttonText}>14 - 18</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserAge('18 - 21')} >
            <ImageBackground source={buttonGradient} style={styles.trainingButton} >
              <Text style={styles.buttonText}>18 - 21</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserAge('21 - 30')} >
            <ImageBackground source={buttonGradient} style={styles.trainingButton} >
              <Text style={styles.buttonText}>21 - 30</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserAge('30 - 60')}>
            <ImageBackground source={buttonGradient} style={styles.trainingButton} >
              <Text style={styles.buttonText}>30 - 60</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
        marginTop: 15,
        fontFamily: 'Gilroy-Regular',
        fontWeight: '700',
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
        marginTop: -12,
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
        marginTop: '-2%',
        width:'100%'
    }
})

WellcomeAge.propTypes = {
  user: PropTypes.object,
};

WellcomeAge.defaultProps = {
  user: {}
};

const mapStateToProps = ({ users }) => ({
  user: users.user
});

const mapDispatchToProps = { userDataRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(WellcomeAge);

