import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { myColors } from '../constants/constantColor';

export default function Loaders({ isCentered }) {
    return (
        <View style={isCentered ?
            { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }
            : [styles.container, styles.horizontal]}>
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