import React from "react"
import { View } from "react-native"

export default function Container({ children }) {
    return (
        <View style={{ padding: 15, }}>
            {children}
        </View>
    )
}
