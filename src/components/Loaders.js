import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { myColors } from '../constants/constantColor';

export default function Loaders() {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={myColors.danger} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});