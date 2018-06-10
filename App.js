//import stuff
import React from 'react';
import {ScrollView,StyleSheet,View,Text,TextInput,Button,TouchableOpacity} from 'react-native';


//create stuff
class App extends React.Component{
  state = {
    text: "",
    dosis: "",
    hora: "",
    todo: []
  }
  addTodo = () =>{
    var newTodo = this.state.text+" | "+this.state.dosis+" | "+this.state.hora;
    var arr = this.state.todo;
    arr.push(newTodo);
    this.setState({todo: arr, text: "", dosis:"", hora:""});
  }
  deleteTodo = (t) =>{
    var arr = this.state.todo;
    var pos = arr.indexOf(t);
    arr.splice(pos,1);
    this.setState({todo: arr});
  }
  renderTodos = () =>{
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
    return(
      <ScrollView>

      <View style={styles.wholeStyle}>
        <View style={styles.viewStyle}>
          <Text style={styles.header}>Recordarium</Text>
          <TextInput 
            style={styles.inputStyle}
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
          <Button 
            title="Agregar nueva alarma"
            color="green"
            onPress={this.addTodo}
          />
          <View style={{marginTop: 100}}/>
          {this.renderTodos()}
        </View>
      </View>
      </ScrollView>
    )
  }
}

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
  }
});

//export stuff
export default App;