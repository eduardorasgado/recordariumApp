//Aqui funciones y componentes

import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import Clock from './Clock';
import Navegacion from './Navbar';
import Input from './Input';
import Articulo from './Articulo';

class Index extends Component {

	state = {
		medicina: '',
		dosis: '',
		date: '',
	}
	

	onChangeMed = (medicina) => {
		this.setState({
			medicina: medicina
		})
	}
	onChangeDosis = (dosis) =>{
		this.setState({
			dosis: dosis
		})
	}
	onChangeDate = (date) =>{
		this.setState({
			date: date
		})
	}
	render(){
		return(
			<View style={styles.wholeStyle}>
				<Navegacion />
				<View style={styles.viewStyle}>
					<ScrollView>
						<Input 
							onChangeMed={this.onChangeMed}
							onChangeDosis={this.onChangeDosis}
							onChangeDate={this.onChangeDate}
						/>
						<Articulo />
					</ScrollView>
				</View>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	wholeStyle: {
    backgroundColor: "white",
    flex:1,
    height: 700,
    },
    viewStyle: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    },
});

export default Index;