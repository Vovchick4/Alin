import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'

import { myColors } from '../constants/constantColor';

export default function Loaders({ isOverlay, isCentered }: any) {
    return (
        <React.Fragment>
            {!isOverlay ? (
                <View style={isCentered ?
                    { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }
                    : [styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color={myColors.danger} />
                </View>
            ) : (
                <View style={styles.overlay}>
                    <View style={isCentered ?
                        { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }
                        : [styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color={myColors.danger} />
                    </View>
                </View>
            )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: myColors.overlay,
        zIndex: 9999
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
});