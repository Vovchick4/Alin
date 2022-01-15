import React from "react"
import { View } from "react-native"

export default function Container({ children, isOnlyVeticalPadding = true, isBackGround = false }) {
    return (
        <View style={isOnlyVeticalPadding ? { padding: 15 } : { paddingVertical: 15 }}>
            {children}
        </View>
    )
}
