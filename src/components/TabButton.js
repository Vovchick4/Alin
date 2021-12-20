import React, { useEffect } from "react"
import { Animated } from "react-native"
import { Icon } from "react-native-elements"

export default function TabButton({ typeIcon, icon, focused, ...props }) {
    const AnimationState = {
        fromScale: new Animated.Value(1),
        tocale: new Animated.Value(2)
    }

    useEffect(() => {
        Animated.timing(AnimationState.fromScale, { toValue: 1.4, duration: 343, useNativeDriver: true }).start()
        Animated.timing(AnimationState.tocale, { toValue: 1, duration: 438, useNativeDriver: true }).start()
    })

    return (
        <Animated.View style={focused ? { transform: [{ scale: AnimationState.fromScale }] } : { transform: [{ scale: 1 }] }}>
            <Icon
                name={icon}
                type={typeIcon}
                {...props}
            />
        </Animated.View>
    )
}
