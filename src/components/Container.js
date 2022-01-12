import React from "react"
import { View } from "react-native"

import { colors } from "../constants/constantColor"

export default function Container({ children, isOnlyVeticalPadding = true, isBackGround = false }) {
    const cl = isBackGround ? colors.gray : '#000000'

    return (
        <View style={isOnlyVeticalPadding ? { padding: 15, backgroundColor: cl } : { paddingVertical: 15 }}>
            {children}
        </View>
    )
}
