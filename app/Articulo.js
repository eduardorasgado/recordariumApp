//para crear cada capsulilla
import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Articulo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<ListView
					style={styles.list}
					enableEmptySections
					dataSource={this.props.dataSource}
					renderRow={({key, ...value}) => {
						const activate = (
							<TouchableOpacity
									onPress={() => this.props.handleNotifications(value, key)}								
							>		
								<Icon 
									name="bell-o"
									size={30}
									color="white"
								/>
							</TouchableOpacity>
						);
						const desactivate = (
							<TouchableOpacity
									onPress={() => this.props.handleRemoveNotifications(key)}															
							>		
								<Icon 
									name="bell-slash-o"
									size={30}
									color="white"
								/>
							</TouchableOpacity>
						);
						const deleteRow = (
								<Icon
									name="times"
									size={30}
									color="#F92463FF"
								/>
						);
						return(
								<View style={styles.row}>
									<View style={{
								        flex: 1,
								        flexDirection: 'column',
								        justifyContent: 'center',
								        alignItems: 'center',
								      }}>
										<Text style={styles.textIt}>{value.medicina}</Text>
										<Text>{value.dosis}</Text>
										<Text>{value.date}</Text>
									</View>
									<TouchableOpacity
										onPress={() => this.props.onRemoveItem(key)}									
									>
										{deleteRow}
									</TouchableOpacity>
									{value.notification ? desactivate : activate}
								</View>
							)
					}}
				/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		marginTop:10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#55FF7FFF',
		marginBottom: 5,
		borderRadius: 5,
	},
	textIt: {
		fontSize: 22,
		fontWeight: 'bold'
	}
});

export default Articulo;