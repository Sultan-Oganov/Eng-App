import React, { Component } from 'react';
import { Text, View, StyleSheet, Animated } from "react-native";

const barMinWidthOffset = 20;
const maxFontSize = 15;

export default class ProgressBar extends Component {

    state = {
        width: new Animated.Value(0),
        progress: 0,
    };

    componentDidMount() {
        this.animate();
        if (this.props.progress > 0 && this.props.size > 0) {
            setTimeout(() => {
                const sizeWidthRatio = this.props.size / this.props.width;
                const progress = (this.props.progress > this.props.size) ? this.props.size : this.props.progress;
                this.state.width.setValue(progress / sizeWidthRatio);
            }, 100);
        }
    }

    
    UNSAFE_componentWillReceiveProps(props) {
        if (this.props.progress !== props.progress) {
            const sizeWidthRatio = props.size / props.width;
            const progress = (props.progress > props.size) ? props.size : props.progress;
            this.state.width.setValue(progress / sizeWidthRatio);
        }
    }

    animate() {
        const percentageWidthRatio = 10 / this.props.width;
        this.state.width.setValue(0);

        this.state.width.addListener((progress) => {
            const progressValue = parseInt(progress.value * percentageWidthRatio, 10);
            this.setState({
                progress: progressValue
            });
            if (this.props.onProgress) {
                this.props.onProgress(progressValue);
            }
        });

        Animated.timing(this.state.width, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    render() {
        const {
            size,
            color,
            children,
            style,
            height
        } = this.props;

        if (!(size > 0)) return <View />;

        let fontSize = (this.state.progress <= barMinWidthOffset) ? (height / 3) : (height / 2);
        fontSize = (fontSize > maxFontSize) ? maxFontSize : fontSize;

        return (
            <View style={styles.container}>
                <View style={styles.progressVal} />
                <View style={styles.progressOverrideVal}><Text style={styles.text}>{this.props.progress}</Text></View>
                <View style={[{ width: this.props.width, height: this.props.height, borderRadius: 25, backgroundColor: '#f2f2f2' }, style]}>
                    <Animated.View
                        style={[styles.progressBar, {
                            width: this.state.width,
                        }]}
                    >
                    </Animated.View>
                    {children}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
        borderRadius: 25,
    },

    progressBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor:"#9BC6FF",
        width: '100%',
    },

    progressVal: {
        width: 20,
        height: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressOverrideVal: {
        position: 'absolute',
        left: 10,
        width: 35,
        height: 35,
        backgroundColor:"#9BC6FF",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontFamily: 'Gilroy-Regular',
    }
})