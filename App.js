import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { StyleSheet, ScrollView, View, Text, TouchableNativeFeedback, PermissionsAndroid } from 'react-native';
import TodoList from './components/todo-list';
import AddTodo from './components/add-todo';


const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#14cba8',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white'
  },
}

class TodoDetails extends Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'Todo'
  }
  render() {
    const todo = this.props.navigation.getParam('todo');
    console.warn(todo);
    return (
        <View>
          <Text>
            {todo.text}
          </Text>
          <Text>
            created at: {todo.location}
          </Text>
        </View>
    ) 
  }
}

class Home extends Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'Todo App'
  };
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      idCount: 0,
    }
    this.requestMapsPermission();
  }
 
  async requestMapsPermission() {
    try {
      const isGranted = await PermissionsAndroid.request (
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Todo app location access',
          'message': 'We need your location to know where you are'
        }
      )
      console.warn(isGranted)
      this.setState({
        geolocationPermissionGranted: isGranted
      })    
    } catch (err){
      console.error(err);
    }
  }


  async setTodolocation (id, coords) {
    const {latitude, longitude} = coords;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`
      );
      const data = await response.json();

      if (!data.error_message) {
        const address = data.results[0].formatted_address;

        const {todos} = this.state;
        todos
        .find(todo=> todo.id === id)
        .location = address;
        this.setState({
          todos
        })
      } else {
        throw JSON.stringify(data);
      }
    } catch(e) {
      console.error(e);
    }
  }

  addTodo(text) {
    const id = this.state.idCount +1;
    this.setState({
      todos: this.state.todos.concat([{ text, id }]),
      idCount: id
    });
  
    if (this.state.geolocationPermissionGranted){
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setTodolocation(id, pos.coords)
      }, null, { enableHighAccuracy: true})
    }
  }


  render() {
    let { todos } = this.state;
    return (
      <View style= {styles.container}>
        <ScrollView contentContainerStyle={styles.ScrollView}>
         <AddTodo add={text => this.addTodo(text)} />
         <TodoList 
         todoList={todos}
         navigation= {this.props.navigation}
         />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  ScrollView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  TodoDetails: { screen: TodoDetails}
})

export default createAppContainer(AppNavigator);