//aqui esta el formulario

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

class Input extends Component {
	render(){
		return(
			<View>
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
					mode={"datetime"}
					placeholder="Horario"
					format="YYY-MM-DD HH:mm"
					minDate={moment().format("LL")}
					maxDate={"2050-01-01"}
					confirmBtnText="Aceptar"
					cancelBtnText="Cancelar"
					onChangeDate={(date) => this.props.onChangeDate(date)}
				/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
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
});

export default Input;