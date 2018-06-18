//para crear cada capsulilla
import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, Button } from 'react-native';

class Articulo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<ListView
					style={styles.list}
					enableEmptySections
					dataSource={this.props.dataSource}
					renderRow={({key, ...value}) => {
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
									<Button
										title="Eliminar"
										onPress={() => this.props.onRemoveItem(key)}
										color="#F92463FF"
									/>
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
		paddingHorizontal: 5,
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