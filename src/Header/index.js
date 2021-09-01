import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import headerIcon from '../images/headerIcon.png'

export default function Header({props}) {
    return (
        <TouchableOpacity 
            style={styles.header} 
            onPress={() => props.navigation.goBack()}
        >
            <Image 
                source={headerIcon}
                style={styles.headerIcon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerIcon: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 20,
        marginBottom: 15,
        marginTop: 30,
    },
    header : {
        backgroundColor : "#fff"
    }
})