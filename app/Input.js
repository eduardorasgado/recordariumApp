//aqui esta el formulario

import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Input extends Component {
	render(){
		return(
			<View>
				<TextInput
					placeholder="Medicamento"
					style={styles.inputStyle}
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