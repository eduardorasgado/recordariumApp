//barra de navegacion

import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Clock from './Clock';

class Navegacion extends Component {
	render(){
		return(
			<View style={styles.block}>
				<View style={styles.content}>				
					<View style={styles.btnBox}>
						<Button 
			            	title="Agregar"
			            	onPress={null}
			            	style={styles.containerButton}
		            	/>
					</View>
					<Text style={styles.textCenter}>Rum</Text>
					
				</View>
				<Clock />
			</View>
			)
	}
}

const styles = StyleSheet.create({
	block: {
		backgroundColor: '#81C04d',
	},
	content: {
		paddingTop: 30,
		paddingBottom: 10,
		marginLeft:10,
		height:80,
		flexDirection: 'row'
	},
	btnBox: {
		paddingTop: 45,
		zIndex: 1,
	},
	containerButton: {
		position: 'absolute',
		zIndex: 1,
	},
	textCenter: {
		flex: 1,
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'white',
		fontSize: 30,
	}
});

export default Navegacion;