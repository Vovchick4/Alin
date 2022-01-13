import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { colors } from '../constants/constantColor';

export default function Loaders() {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={colors.danger} />
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