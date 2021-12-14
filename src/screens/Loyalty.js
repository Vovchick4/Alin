import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Loyalty({ navigation }) {
    return (
        <View>
            <Text>Loyalty!</Text>
            <Button title='TITLE' onPress={() => navigation.navigate('Rent')} />
        </View>
    );
}
