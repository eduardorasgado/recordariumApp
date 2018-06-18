//import stuff
import React from 'react';
import {ScrollView,StyleSheet,View,Text,TextInput,Button,TouchableOpacity} from 'react-native';
import Clock from './Clock';
//import { StackNavigator } from 'react-navigation';

//create stuff
class App extends React.Component{
  //variables globales, minidatabase de forma temporal
  state = {
    text: "",
    dosis: "",
    hora: "",
    todo: []
  }

  //Funciones en ECMAScript 6 --> tendencia de Javascript
  //agrega una capsula en tiepo real
  addTodo = () =>{
    //contenido de la capsula
    var newTodo = this.state.text+" | "+this.state.dosis+" | "+this.state.hora;
    //creamos un objeto de lista que va guardando las alarmas
    var arr = this.state.todo;
    //guardando la capsula
    arr.push(newTodo);
    //guardar los cambios
    this.setState({todo: arr, text: "", dosis:"", hora:""});
  }

  //funcion para borrar la capsula agregada, en tiempo real al touch
  deleteTodo = (t) =>{
    //toma el valor de la capsula a borrar
    var arr = this.state.todo;
    //capturamos indice de la capsula que tocamos
    var pos = arr.indexOf(t);
    //tomar la pocision en el arreglo de esa capsula
    arr.splice(pos,1);
    //intercamba la capsula por un vacio
    this.setState({todo: arr});
  }

  //funcion que hace que toda la app se actualice a cada segundo, en tiempo real
  renderTodos = () =>{
    //toma el arreglo de todas las capsulas y las pone en la vista
    return this.state.todo.map(t=>{
      return (
        <TouchableOpacity key={t}>
          <Text
            style={styles.todo}
            onPress={()=>{this.deleteTodo(t)}}
          >{t}</Text>
        </TouchableOpacity>
      )
    })
  }
  render(){
    //esto es el bucle que permite renderear al celular
    return(
      //Scrollview permite hacer scrolling o mover arriba y abajo
      <ScrollView>

      <View style={styles.wholeStyle}>
        <View style={styles.viewStyle}>
         {/*EStos son los componentes de la aplicacion*/}
          {/*TITULO*/}
          <Text style={styles.header}>Recordarium</Text>
          {/*Componente de reloj en tiempo real*/}
          <Clock />
          {/*Donde metemos el texto a escribir*/}
          <TextInput 
            style={[styles.inputStyle, styles.stylo]}
            onChangeText={(text)=>this.setState({text})}
            value={this.state.text}
            placeholder={"medicamento aqui"}
          />
          <TextInput 
            style={styles.inputStyle}
            onChangeText={(dosis)=>this.setState({dosis})}
            value={this.state.dosis}
            placeholder={"Dosis aqui"}
          />
          <TextInput 
            style={styles.inputStyle}
            onChangeText={(hora)=>this.setState({hora})}
            value={this.state.hora}
            placeholder={"Hora aqui"}
          />
          {/*BOTON PARA ACEPTAR EL AGREGADO*/}
          <Button 
            title="Agregar nueva alarma"
            color="green"
            onPress={this.addTodo}
          />
          {/*Mandamos a llamar todas las alarmas o capsulas*/}
          <View style={{marginTop: 100}}/>
          {this.renderTodos()}
        </View>
      </View>
      </ScrollView>
    )
  }
}

//Estos son los estilos o el CSS que le da color, forma a los componentez
//StyleSheet es un objeto de reac native que permite meter estilos
const styles = StyleSheet.create({
  wholeStyle: {
    backgroundColor: "#0288D1",
    flex:1,
    height: 700,
  },
  viewStyle: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    
  },
  inputStyle:{
    height: 40,
    width: 300,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius: 20,
    fontSize: 24
  },
  header:{
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 40
  },
  todo: {
    fontSize: 24,
    color: '#0288D1',
    backgroundColor: 'white',
    borderColor: "white",
    borderWidth: 1,
    paddingLeft:10,
    paddingRight:10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 320,
    margin: 10,
    borderRadius: 10,
  },
  stylo: {
    marginTop:10,
  }
});

//exportamos la aplicacion a la parte logica del celular
export default App;