import React from "react";
import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

export class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            position: 0,
            timeLeft: "",
            ismute: false,
            remaintime: "",
            positiontime: "",
            durationtime: "",
            isdurationorposition: true,
        };
        soundObject.loadAsync({ uri: this.props.audio });
    }

    async componentDidMount() {
        await soundObject.pauseAsync()
    }
   
    handlePlayPause = async () => {
        const { isPlaying } = this.state;
        isPlaying ? await soundObject.pauseAsync() : await soundObject.playAsync();

        this.setState({
            isPlaying: !isPlaying,
        });
    };
    
    render() {
        return(<></>)
    }

}