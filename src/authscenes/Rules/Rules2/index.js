import React from 'react'
import { View, Text, ScrollView, StyleSheet} from 'react-native'
// import { useFonts } from 'expo-font';

export default function Rules2({navigation}) {

    // let [fontsLoaded] = useFonts({
    //     gilroyLight: require('../../../../assets/fonts/Gilroy-Light.ttf'),
    //     gilroyMedium: require('../../../../assets/fonts/Gilroy-Medium.ttf'),
    //     gilroyRegular: require('../../../../assets/fonts/Gilroy-Regular.ttf'),
    //     gilroySemiBold: require('../../../../assets/fonts/Gilroy-Semibold.ttf'),
    //   });
    // if (!fontsLoaded) {
    //     return null;
    // }

    return (
        <View
        style={styles.container}>
            <Text
            style={styles.title}>Пользовательское соглашение</Text>
            <ScrollView
            style={styles.scrollText}>
                <Text
                style={styles.subTitle}>
                Значимость этих проблем настолько очевидна, 
                что консультация с широким активом позволяет 
                выполнять важные задания по разработке позиций, 
                занимаемых участниками в отношении поставленных задач. 
                Равным образом реализация намеченных плановых заданий 
                обеспечивает широкому кругу (специалистов) участие 
                в формировании новых предложений. Идейные соображения 
                высшего порядка, а также рамки и место обучения кадров 
                играет важную роль в формировании существенных 
                финансовых и административных условий.
                {'\n'}
                {'\n'}
                С другой стороны дальнейшее развитие различных 
                форм деятельности требуют определения и уточнения 
                соответствующий условий активизации. Идейные соображения 
                высшего порядка, а также дальнейшее развитие различных 
                форм деятельности позволяет выполнять важные задания 
                по разработке форм развития. Товарищи! начало повседневной 
                работы по формированию позиции требуют определения и 
                уточнения дальнейших направлений развития. Задача организации, 
                в особенности же рамки и место обучения кадров позволяет 
                оценить значение форм развития. Значимость этих проблем 
                настолько очевидна, что дальнейшее развитие различных 
                форм деятельности позволяет оценить значение позиций, 
                занимаемых участниками в отношении поставленных задач. 
                Равным образом рамки и место обучения кадров в значительной 
                степени обуславливает создание систем массового участия.
                {'\n'}
                {'\n'}
                Не следует, однако забывать, что дальнейшее развитие 
                различных форм деятельности влечет за собой процесс внедрения 
                и модернизации модели развития. С другой стороны 
                укрепление и развитие структуры требуют определения 
                и уточнения дальнейших направлений развития.
                </Text>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        fontFamily: 'Gilroy-Regular',
        marginTop: '10%',
        marginLeft: '5%',
    },
    scrollText: {
        marginTop: '5%',
        marginLeft: '5%',
        width: '90%'
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Gilroy-Regular',
        textAlign: 'justify',
        width: '97%'
    }
})