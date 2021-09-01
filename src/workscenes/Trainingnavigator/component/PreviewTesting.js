import React, { useState, useEffect } from "react";
import { Animated,Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, TouchableHighlight,ScrollView, Platform } from "react-native";
import { Audio } from 'expo-av';
// import Speaker from '../../../../assets/images/Speaker.svg'
import swiperBG from '../../../../assets/images/swiperBG.png'

const audioClip = new Audio.Sound();

export const PreviewTesting = ({ checkResp = Boolean, handleViewRes = Function, data = Object,fadeAnim= Function } = {}) => {

    // const [audioClip] = useState(new Audio.Sound());

    const { title, transcription, translateWord, sameTranslateWord, examples, audios } = data;

    const play = async () => {
        if (audios.length > 0) {
            try {
                if (audioClip._loaded) {
                    await audioClip.stopAsync();
                    await audioClip.unloadAsync();
                }
                const uri = audios[0].link;
                if (uri && uri !== '') {
                    await audioClip.loadAsync({ uri });
                    if (audioClip._loaded) {
                        await audioClip.playAsync();
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        if (!checkResp) play();
    })

    return (
        <View style={styles.wrapper}>
        <ImageBackground
        resizeMode='stretch'
        style={ Platform.OS == 'android'?{
            width: '102%',
            height:'102%',
            paddingVertical:0,
            paddingHorizontal:0,
            alignSelf: 'center',
            marginLeft:-6
        } : {
            width: '100%',
            height:'102%',
            paddingVertical:0,
            paddingHorizontal:0,
            alignSelf: 'center',
            marginLeft:-6
        }}
        source={swiperBG}
        >
            <ScrollView style={styles.scroll}>
            <TouchableOpacity onPress={() => { if (audioClip._loaded) audioClip.replayAsync() }}>
                <View style={styles.center}>
                    <Text style={styles.title}>{title ?? ""}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.transcription}>{transcription ?? ""}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.content}>
            <Animated.View
                            style={[
                                {
                                    opacity: fadeAnim, // Bind opacity to animated value
                                },
                            ]}>
                            {
                                checkResp
                                    ?
                                    <>

                                        <View style={{ height: 80, }}>
                                            <Text style={styles.answerTitle}>{translateWord ?? ""}</Text>
                                            <Text style={styles.answerSubTitle}>{sameTranslateWord ?? ""}</Text>
                                        </View>
                                    </>
                                    :
                                    <View style={{ width: '60%', height: 1, backgroundColor: '#1068DC', marginTop: 80, opacity: 0.5 }}></View>
                            }
                        </Animated.View>
                        <View style={{ width: '60%', height: 1, backgroundColor: '#1068DC', opacity: 0.5 }}></View>
            </View>

            <View  style={styles.centerDown}>
                {
                    examples?.length > 0
                        ?
                        examples.map((el,i) => {
                            if(i<2) {
                                return (
                                <Text key={el.id} style={styles.example}>{el.Hint}</Text>
                            )
                            }
                        })
                        :
                        <Text style={styles.example}>Нет примеров к этому слову :(</Text>
                }
            </View>
            </ScrollView>
            </ImageBackground>
        </View>
    );
};


const windowDimensions = Dimensions.get('window')
const windowWidth = windowDimensions.width;
const windowHeight = windowDimensions.height;

const styles = StyleSheet.create({
    scroll:{
        marginTop:30,
        width:'100%',
        height:470,
    },
    wrapper: {
        flex: 1,
        backgroundColor: "transparent",  
        height:'70%',
    },
    title: {
        color: "#2A80F1",
        fontSize: 38,
        fontFamily: 'Gilroy-Regular',
    },
    transcription: {
        color: "#BDBDBD",
        fontSize: windowWidth * 0.06,
        fontWeight: '300',
        fontFamily: 'Gilroy-Regular',
    },
    answerTitle: {
        color: "#1D1F21",
        fontSize: 22,
        fontFamily: 'Gilroy-Regular',
        textAlign: 'center',
        width:windowWidth*0.8,
    },
    answerSubTitle: {
        color: "#4F4F4F",
        fontSize: 20,
        fontFamily: 'Gilroy-Regular',
        marginBottom: 5,
        textAlign: 'center'
    },
    example: {
        color: "#4F4F4F",
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 30,
        marginBottom: 20,
        textAlign: 'center',
        width: windowWidth * 0.8,
        fontFamily: 'Gilroy-Regular',
    },
    center: {
        alignItems: 'center',
        marginTop:40,
        
    },
    content:{
        alignItems: 'center',
        marginTop:20,
    },
    centerDown:{
        alignItems: 'center',
        marginTop:20,
        marginBottom: 30,
        
        
    },
    text:{
        color:"#2A80F1",
    }
});