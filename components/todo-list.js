import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Todo from './todo';

class TodoList extends Component {
    render() {
        let { todoList } = this.props;
        return (
            <View style= {styles.container}>
                {todoList.map((todo, index) => 
                    <Todo 
                    text={ todo.text } 
                    navigation={this.props.navigation}
                    key={index}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
    }
    
})

export default TodoList;