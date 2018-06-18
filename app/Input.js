//aqui esta el formulario

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

class Input extends Component {
	render(){
		return(
			<View style={styles.container}>
				<TextInput
					placeholder="Medicamento"
					style={styles.inputStyle}
					onChangeMed={(medicina) => this.props.onChangeMed(medicina)}
				/>
				<TextInput
					placeholder="Dosis"
					style={styles.inputStyle}
					onChangeDosis={(dosis) => this.props.onChangeDosis(dosis)}
				/>
				<DatePicker
					style={styles.dateStyle}
					mode={"datetime"}
					placeholder="Horario"
					format="YYY-MM-DD HH:mm"
					minDate={"2018-06-15"}
					maxDate={"2050-01-01"}
					confirmBtnText="Aceptar"
					cancelBtnText="Cancelar"
					onChangeDate={(date) => this.props.onChangeDate(date)}
				/>
				<TouchableHighlight style={styles.button}
									onPress={null}
				>
					<Text style={styles.buttonText}>
						Enviar
					</Text>
				</TouchableHighlight>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 80,
	},
	inputStyle: {
	    height: 40,
	    width: 300,
	    borderColor: "white",
	    borderWidth: 1,
	    marginBottom: 5,
	    paddingLeft:10,
	    paddingRight:10,
	    borderRadius: 20,
	    fontSize: 24,
	  },
	  dateStyle: {
	  	marginTop: 20
	  },
	  button: {
	  	backgroundColor: 'skyblue',
	  	paddingTop: 15,
	  	paddingBottom: 15,
	  	marginTop: 5
	  },
	  buttonText: {
	  	textAlign: 'center'
	  }
});

export default Input;