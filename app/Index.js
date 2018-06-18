//Aqui funciones y componentes

import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View, StyleSheet, ListView } from 'react-native';

import Clock from './Clock';
import Navegacion from './Navbar';
import Input from './Input';
import Articulo from './Articulo';



class Index extends Component {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			dataSource: ds.cloneWithRows([]),
			items: [],
			medicina: '',
			dosis: '',
			date: '',
		}

		//reconocemos las funciones como propias de la app
        this.handleState = this.handleState.bind(this);
        this.handleAddItems = this.handleAddItems.bind(this);
        this.onChangeMed = this.onChangeMed.bind(this);
        this.onChangeDosis = this.onChangeDosis.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
	}

	componentWillMount(){
		//persistencia de datos con JSON
		//por default asyncstorage busca a rocksDB pero si no esta
		//guarda todo en un textoplano
		AsyncStorage.getItem('items').then((json) => {
			try {
				const items = JSON.parse(json)
				//guardamos de nuevo el array en el state temporal items y datasource
				this.handleState(items, items)
			} catch (error){
				console.log(error)
			}
		})
	}
	
	//funcion llamada por handleAddItems
	handleState(items, dataSource, obj = {}){
		//obj es medicina, dosis y date vacios
		//nuevos item y data
		this.setState({
			items,
			dataSource: this.state.dataSource.cloneWithRows(dataSource),
			...obj
		})
		//guardamos los valores en async storage
		AsyncStorage.setItem('items', JSON.stringify(items))
	}

	handleAddItems(){
		//se manda a llamar al picar en listo
		if(!this.state.medicina || !this.state.dosis || !this.state.date){
			return true;
		}
		// sintaxis ES6 para desempaquetar todos los items del array con comas
		const newItems = [
			...this.state.items,
			{
				key: Date.now(),
				medicina: this.state.medicina,
				dosis: this.state.dosis,
				date: this.state.date,
				notification: false
			}
		];
		//guardando la variable en datasource y en items
		//y se quedan vacias las tres ultimas, son los obj
		this.handleState(newItems, newItems, {medicina: '', dosis: '', date: ''});
	}

	handleRemoveItem(key){
		//por cada item buscamos aquellos en los que item sea 
		//distinto a key y los guardamos, el que coincida se borra
		const newItems = this.state.items.filter((item) =>{
			return item.key !== key
		})
		this.handleState(newItems, newItems);
	}

	onChangeMed(medicina){
		this.setState({
			medicina
		})
	}
	onChangeDosis(dosis){
		this.setState({
			dosis
		})
	}
	onChangeDate(date){
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
							onRemoveItem={this.handleRemoveItem}
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