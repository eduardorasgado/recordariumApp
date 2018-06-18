import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import KeepAwake from 'react-native-keep-awake';

class Clock extends Component {
	
	state = {
		time: moment().format("LTS"),
		date: moment().format("LL")
	}
	render(){
		setTimeout(() => {
			this.setState({
				time: moment().format("LTS"),
				date: moment().format("LL")
			})
		}, 1000
			);
		return(
				<View style={styles.container}>
					<Text style={styles.timer}>{this.state.time}</Text>
					<Text style={styles.timer}>{this.state.date}</Text>
				</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40,
	},
	timer: {
		color: 'white',
		fontSize: 32,
	}
});

export default Clock;