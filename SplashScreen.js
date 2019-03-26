import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	Image,
	View,
	ActivityIndicator
} from "react-native";

class SplashScreen extends React.Component {
	render() {
		const viewStyles = {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#79797D"
		};
		const textStyles = {
			color: "white",
			fontSize: 40,
			fontWeight: "bold"
		};
		return (
			<View style={viewStyles}>
				<Text style={textStyles}>MUISKELO</Text>
				<Text style={textStyles}>THE APP</Text>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}
}

export default SplashScreen;
