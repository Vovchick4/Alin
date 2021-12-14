import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Emergency({ navigation }) {
    return (
        <View>
            <Text>Call!</Text>
            <Button title='TITLE' onPress={() => navigation.navigate('Rent')} />
        </View>
    );
}
