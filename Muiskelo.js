/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	Image,
	View,
	TouchableWithoutFeedback,
	Slider,
	ToastAndroid,
	Animated
} from "react-native";
import SplashScreen from "./SplashScreen";
var Sound = require("react-native-sound");

Sound.setCategory("Playback");

const instructions = Platform.select({
	ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
	android:
		"Double tap R on your keyboard to reload,\n" +
		"Shake or press menu button for dev menu"
});
var sound;
sound = new Sound("muiskelo.m4a", Sound.MAIN_BUNDLE);

type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			play: true,
			volume: 0.5,
			showSlider: false
		};

		this.playSound = this.playSound.bind(this);
		this.playSound2 = this.playSound2.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
	}
	playSound2() {
		if (this.state.play) {
			sound.play();
		} else {
			sound.stop();
		}
		this.setState({
			play: !this.state.play,
			showSlider: !this.state.showSlider
		});
		ToastAndroid.show(String(this.state.play), ToastAndroid.SHORT);
	}
	changeVolume(vol) {
		this.setState({
			volume: vol
		});
		sound.setVolume(vol);
	}
	playSound() {
		sound = new Sound("muiskelo.m4a", Sound.MAIN_BUNDLE, error => {
			if (error) {
				console.log("failed to load the sound", error);
				return;
			}
			if (this.state.play) {
				console.log(
					"duration in seconds: " +
						sound.getDuration() +
						"number of channels: " +
						sound.getNumberOfChannels()
				);
				sound.play(success => {
					if (success) {
						console.log("successfully finished playing");
						this.setState({
							play: false
						});
					} else {
						console.log("playback failed due to audio decoding errors");
					}
				});
			} else {
				sound.stop();
			}
			// loaded successfully
		});
		this.setState({
			play: !this.state.play
		});
		ToastAndroid.show(String(this.state.play), ToastAndroid.SHORT);
		console.log(this.state.play);
	}

	componentWillUnmount() {
		sound.release();
		this.setState({
			play: false,
			showSlider: false
		});
	}
	render() {
		var slider, splashScreen;
		if (this.state.showSlider) {
			slider = (
				<Slider
					style={{ width: 300 }}
					onValueChange={val => this.changeVolume(val)}
					value={this.state.volume}
				/>
			);
		}

		return (
			<View style={styles.container}>
				{splashScreen}
				<Text style={styles.welcome}>MUISKELO</Text>
				<Image source={require("./media/img/kuis.png")} />
				<TouchableWithoutFeedback onPress={this.playSound2}>
					<View style={{ backgroundColor: "#22D9A", width: 200, height: 100 }}>
						<Text style={{ fontSize: 24, textAlign: "center" }}>Press me</Text>
					</View>
				</TouchableWithoutFeedback>
				{slider}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
		flexDirection: "column",
		justifyContent: "space-evenly"
	},
	welcome: {
		fontSize: 24,
		color: "#79797D",
		textAlign: "center",
		margin: 10
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5
	}
});
