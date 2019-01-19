import React, { Component } from 'react';
import { View } from 'react-native';
import Todo from './todo';

class TodoList extends Component {
    render() {
        let { todoList } = this.props;
        return (
            <View>
                {todoList.map(todo => 
                    <Todo text={ todo.text }/>
                )}
            </View>
        )
    }
}

export default TodoList;