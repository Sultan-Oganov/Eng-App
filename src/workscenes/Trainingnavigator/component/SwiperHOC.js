import React from "react";
import { View, Animated, PanResponder, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { PreviewTesting } from "../component/PreviewTesting";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Swiper extends React.Component {

    constructor() {
        super()

        this.position = new Animated.ValueXY()

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-30deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, -0.8, 1],
            extrapolate: 'clamp'
        })

        this.timing = (new Date()).getTime();
    }

    nextCard() {
        alert('next');
    }

    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120 && this.props.checkResp) {
                    this.props.onSwipeDirection(true)
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        this.setState({ currentIndex: this.props.progress + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else if (gestureState.dx < -120 && this.props.checkResp) {
                    this.props.onSwipeDirection(false)
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        this.setState({ currentIndex: this.props.progress + 1}, () => {
                            this.position.setValue({ x: 0, y: 0 });
                            this.timing = (new Date()).getTime();
                        })
                    })
                }
                else {
                    if (!this.props.checkResp) this.props.onCheckResp();
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                        useNativeDriver: true
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {

        return this.props.data.map((item, i) => {
            
            if (i < this.props.progress) {
                return null
            }
            else if (i == this.props.progress) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}

                        key={i}
                        style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 145, width: SCREEN_WIDTH, padding: 12, position: 'absolute',
        shadowColor: "#2A80F1"}]}>
                        
                        <PreviewTesting
                            checkResp={this.props.checkResp}
                            fadeAnim={this.props.fadeAnim}
                            data={{
                                id: item.id,
                                title: item.WordEn,
                                transcription: item.wordRus.length > 0 ? item.wordRus[0].Transcription : "Empty",
                                translateWord: item.wordRus.length > 0 ? item.wordRus[0].WordRu : "Empty",
                                sameTranslateWord: "",
                                examples: item.wordRus.length > 0 ? item.wordRus[0].hints : [],
                                audios: item.audios
                            }} //Data for view
                        />
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={i} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 145, width: SCREEN_WIDTH, padding: 12, position: 'absolute', shadowColor: "#2A80F1"
                        }]}>
                        <ActivityIndicator size="large" color="#2A80F1" />

                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {this.renderUsers()}
            </View>
        );
    }
}

export default Swiper;
