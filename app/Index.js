//Aqui funciones y componentes

import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, ListView } from 'react-native';

import Clock from './Clock';
import Navegacion from './Navbar';
import Input from './Input';
import Articulo from './Articulo';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Index extends Component {
	state = {
		dataSource: ds.cloneWithRows([]),
		items: [],
		medicina: '',
		dosis: '',
		date: '',
	}
	
	handleState(items, dataSource){
		//nuevos item y data
		this.setState({
			items,
			dataSource: this.state.dataSource.cloneWithRows(dataSource),
		})
	}

	handleAddItems = () => {
		if(!this.state.medicina && !this.state.dosis && !this.state.date){
			return true;
		}
		// sintaxis ES6 para desempaquetar todos los items del array con comas
		const newItems = [
			... this.state.items,
			{
				key: Date.now(),
				medicina: this.state.medicina,
				dosis: this.state.dosis,
				date: this.state.date,
				notification: false
			}
		];
		//guardando la variable en datasource y en items
		this.handleState(newItems, newItems);
	}

	onChangeMed = (medicina) => {
		this.setState({
			medicina
		})
	}
	onChangeDosis = (dosis) => {
		this.setState({
			dosis
		})
	}
	onChangeDate = (date) =>{
		this.setState({
			date
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
							onHandleItems={this.handleAddItems}
							date={this.state.date}
							medicina={this.state.medicina}
							dosis={this.state.dosis}
						/>
						<Articulo 
							dataSource={this.state.dataSource}
						/>
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