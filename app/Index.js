//Aqui funciones y componentes

import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View, StyleSheet, ListView } from 'react-native';

import { Permissions, Notifications } from 'expo';

import moment from 'moment';
//COmponentes
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
        this.handleState = this.handleState.bind(this)
        
        this.onChangeMed = this.onChangeMed.bind(this)
        this.onChangeDosis = this.onChangeDosis.bind(this)
		this.onChangeDate = this.onChangeDate.bind(this)
		
		this.handleAddItems = this.handleAddItems.bind(this)
		this.handleRemoveItem = this.handleRemoveItem.bind(this)

		this.handleToggleNotifications = this.handleToggleNotifications.bind(this)
		this.handleRemoveNotifications = this.handleRemoveNotifications.bind(this)
		this.handleNotifications = this.handleNotifications.bind(this)

	}

	//antes de que se monte el componente
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

	//mostrar notificaciones
	handleToggleNotifications(key, notification){
		const newItems = this.state.items.map((item) => {
			//regresar todos los items distintos al item con la key
			if(item.key !== key) return item
			return {
				...item,
				notification
			}
		})
		//ahora guardamos el grupo de items
		this.handleState(newItems, newItems)
	}

	//borrar notificaciones
	handleRemoveNotifications(key){
		//Notifications.cancelAllScheduledNotificationsAsync();

		//inactivar la notificacion
		this.handleToggleNotifications(key, false)
	}
	
	handleNotifications(value, key){

		const localNotification = {
	    title: 'Recordarium: Tus medicinas!',
	    body: 'Hora:'+key+"; Ya es momento: "+value.medicina+",Dosis: "+value.dosis, // (string) — body text of the notification.
		    
		android: // (optional) (object) — notification configuration specific to Android.
		    {
		      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
		      //icon (optional) (string) — URL of icon to display in notification drawer.
		      //color (optional) (string) — color of the notification icon in notification drawer.
		      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
		      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
		      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
		      // link (optional) (string) — external link to open when notification is selected.
		    }
		  };

		//let t = new Date();
		//t.setSeconds(t.getSeconds() + 10);
		let t = moment(value.date, "YYYY-MM-DD HH:mm").toDate()
		const schedulingOptions = {
		    time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
		  };

		Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
		this.handleToggleNotifications(key, true)
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
		this.handleState(newItems, newItems, {medicina: '', dosis: '', date: ''})
	}

	handleRemoveItem(key){
		//por cada item buscamos aquellos en los que item sea 
		//distinto a key y los guardamos, el que coincida se borra
		const newItems = this.state.items.filter((item) =>{
			return item.key !== key
		})
		this.handleState(newItems, newItems)
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
				<Navegacion 
	
				/>
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
							isVisible={this.state.isVisible}
						
						/>
						<Articulo 
							dataSource={this.state.dataSource}
							onRemoveItem={this.handleRemoveItem}
							handleRemoveNotifications={this.handleRemoveNotifications}
							handleNotifications={this.handleNotifications}
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
    
    },
    viewStyle: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

    },
});

export default Index;