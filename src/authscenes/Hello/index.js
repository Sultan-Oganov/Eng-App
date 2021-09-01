import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Spinner from '../../Spinner';
import { getToken } from '../../AsyncStorage/AsyncStorage';
import { getUser } from '../../actions/apiActions';
import { userRoutine, userEndLoading } from '../../store/userReducer';

import Screen1 from '../../images/WellcomeAim.png'
import Screen2 from '../../images/WellcomeEng.png'
import Screen3 from '../../images/WellcomeName.png'
import Screen4 from '../../images/WellcomeSex.png'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const Hello = ({ navigation, isLoading, userRoutine, userEndLoading }) => {
    const [secretPass, setSecretPass] = useState(true)

    const testUser = async () => {
        const token = await getToken();
        if (token) {
            await delay(500);
            const user = await getUser();
            if (user.id) {
                userRoutine({ user });
            }
        }
        userEndLoading();
    }

    useEffect(() => {
        testUser();
    })

    return (
        <View style={styles.container}>
            <View
                style={Platform.OS === 'android' ? styles.swiperA : styles.swiper}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    index={2}
                    showPagination
                    paginationStyleItemActive={Platform.OS == 'android' ? { backgroundColor: 'white', borderWidth: 2, borderColor: 'white' }
                        : { backgroundColor: 'grey', borderWidth: 3, borderColor: 'grey' }
                    }
                    paginationStyleItemInactive={
                        Platform.OS == 'android' ? { backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, } : { backgroundColor: 'transparent', borderColor: 'grey', borderWidth: 1, }
                    }
                >
                    <View style={[styles.child]}>
                        <Image source={Screen1} style={Platform.OS == 'ios' ? styles.scrollImage : null} />
                    </View>
                    {/* <View style={[styles.child]}>
                        <Image source={Screen2} style={Platform.OS == 'ios' ? styles.scrollImage : null} />
                    </View> */}
                    <View style={[styles.child]}>
                        <Image source={Screen3} style={Platform.OS == 'ios' ? styles.scrollImage : null} />
                    </View>
                    <View style={[styles.child]}>
                        <Image source={Screen4} style={Platform.OS == 'ios' ? styles.scrollImage : null} />
                    </View>
                </SwiperFlatList>
            </View>
            {isLoading
                ? (<Spinner />)
                : (<View
                    style={Platform.OS == 'ios' ? styles.buttonPannel : styles.buttonPannelA}
                >
                    <LinearGradient
                        colors={['#2F80ED', '#ABA0FF']}
                        style={Platform.OS == 'android' ? styles.background : styles.backgroundIOS}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>Войти</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() =>
                                navigation.navigate('Registration')}>
                            <Text style={styles.buttonText1}>Регистрация</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>)}
        </View>
    )
}
const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    },
    swiper: {
        backgroundColor: 'white',
        height: '76%',
        zIndex: 2,
    },
    swiperA: {
        backgroundColor: 'white',
        height: '73%',
        zIndex: 2
    },
    child: {
        backgroundColor: 'black',
        opacity: 0.6,
        height: '100%'
    },
    scrollImage: {
        width: windowWidth,
    },
    buttonPannel: {
        height: 220,
        backgroundColor:
            // 'rgba(0,0,0,0.2)'
            'white'
        ,
        borderRadius: 20,
    },
    buttonPannelA: {
        height: 220,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
    },
    background: {
        // borderRadius: 20,
        height: '100%'
    },
    backgroundIOS: {
     
        height: '100%'
    },
    button: {
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 54,
        flexDirection: 'row',
        elevation: 6,
        marginTop: '10%',
        alignSelf: 'center',
        paddingTop: '1%',
    },
    buttonText: {
        // fontSize: windowWidth * 0.045,
        color: '#949AFB',
        fontFamily: 'Gilroy-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,

    },
    button1: {
        backgroundColor: 'transparent',
        width: 325,
        height: 45,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '2%',
        alignSelf: 'center',
        paddingTop: '1%',
    },
    buttonText1: {
        // fontSize: windowWidth * 0.045,
        color: 'white',
        fontFamily: 'Gilroy-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
    },
})

Hello.propTypes = {
    isLoading: PropTypes.bool
};

Hello.defaultProps = {
    isLoading: true
};

const mapStateToProps = ({ users }) => ({
    isLoading: users.isLoading
});
const mapDispatchToProps = { userRoutine, userEndLoading };
export default connect(mapStateToProps, mapDispatchToProps)(Hello);