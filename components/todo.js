import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

class Todo extends Component {
    render() {
        console.warn(this.props.todo);
        let { text } = this.props;
        return (
            <TouchableNativeFeedback
            onPress={() => 
            this
              .props
              .navigation
              .navigate('TodoDetails', {todo: this.props.todo})
            }>
            <View style={styles.container}>
                <Text style={styles.text}>
                    { this.props.todo.text }
                </Text>
            </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 7.5,
        borderRadius: 5,
        marginBottom: 7.5,
        backgroundColor: 'white',
        elevation: 7,
    }
})
export default Todo;