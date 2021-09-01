// import { useFonts } from 'expo-font';
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'

import arrow from '../../images/arrow.png'


export default function Rules({navigation}) {
    return (
        <View
        style={styles.container}>
            <Text
            style={styles.mainTitle}>Правила и соглашения</Text>
            
            <View
            style={styles.navigationButtons}>
            <View>
            <TouchableOpacity
            style={styles.routerButton}
            onPress={()=>
            navigation.navigate('Rules1')}>
                <Text
                style={styles.routerTitle}
                >Политика конфиденциальности</Text>
                <Image
                    source={arrow}
                />
                
            </TouchableOpacity>
            <View style={styles.divider}/>
            </View>

            <View> 
            <TouchableOpacity
            style={styles.routerButton}
            onPress={()=>
            navigation.navigate('Rules2')}>
                <Text
                style={styles.routerTitle}
                >Пользовательское соглашение</Text>
                <Image
                    source={arrow}
                />
                
            </TouchableOpacity>
            <View style={styles.divider}/>
            </View> 
           
            <View>
                <TouchableOpacity
            style={styles.routerButton}
            onPress={()=>
            navigation.navigate('Rules3')}>
                <Text
                style={styles.routerTitle}
                >Согласие на обработку ПД</Text>
                <Image
                    source={arrow}
                />
                
            </TouchableOpacity>
            <View style={styles.divider}/>
            </View>
            
                <View>
                   <TouchableOpacity
            style={styles.routerButton}
            onPress={()=>
            navigation.navigate('Rules4')}>
                <Text
                style={styles.routerTitle}
                >Правила продажи товаров</Text>
                <Image
                    source={arrow}
                />
                
            </TouchableOpacity> 
            <View style={styles.divider}/>
                </View>
            
                <View>
                    <TouchableOpacity
            style={styles.routerButton}
            onPress={()=>
            navigation.navigate('Rules5')}>
                <Text
                style={styles.routerTitle}
                >Лицензия OpenStreetMap</Text>
                <Image
                    source={arrow}
                />
                
            </TouchableOpacity>
            <View style={styles.divider}/>
                </View>
            
            </View>
        </View>
    )
}

const windowDimensions = Dimensions.get('window')

const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainTitle: {
        fontSize: 26,
        fontFamily: 'Gilroy-Regular',
        marginLeft: windowWidth * 0.06,
        marginTop: windowHeight * 0.02
    },
    navigationButtons:{
        marginTop: windowHeight * 0.04,
        marginLeft: windowWidth * 0.02,
    },
    routerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: '5%',
        marginTop: '5%'
    },
    routerTitle: {
        fontSize: 17,
        marginLeft: '5%',
        fontFamily: 'Gilroy-Regular'
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: '#BDBDBD',
        width: '90%',
        marginLeft: '5%'
    }
})