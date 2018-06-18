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
								<View>
									<Text>{value.medicina}</Text>
									<Text>{value.dosis}</Text>
									<Text>{value.date}</Text>
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

	}
});

export default Articulo;