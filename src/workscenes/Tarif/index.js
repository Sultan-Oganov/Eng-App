import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import VoidMenu from '../../images/voidMenu.svg';

export default function Tarif() {
  const navigation = useNavigation();

    return (
        <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>
            Покупка тарифа
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Dashboard')}
          >
            <VoidMenu
              style={styles.headerExitWorkout}
            />
          </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const windowDimensions = Dimensions.get('window')

export const windowWidth = windowDimensions.width;
export const windowHeight = windowDimensions.height;
const isLongDevices = isIphoneX()

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: windowWidth * 0.04,
        paddingTop: isLongDevices ? windowWidth * 0.12 : windowWidth * 0.05,
        alignSelf: 'center',
      },
      headerTitle: ({
        color: 'black',
        fontSize: windowWidth * 0.08,
        textAlign: 'center',
        fontFamily: 'Gilroy-Regular',
      }),
      headerExitWorkout: {
        width: windowWidth * 0.1,
        height: windowWidth * 0.1,
        alignSelf: 'center'
      },
      headerTop: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: 325,
        marginBottom: windowWidth * 0.05,
        paddingTop: windowHeight * 0.03,
  },
})