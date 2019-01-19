import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Todo extends Component {
    render() {
        let { text } = this.props;
        return (
            <View>
                <Text>
                    { text }
                </Text>
            </View>
        )
    }
}

export default Todo;