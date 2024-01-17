import React, { useEffect } from "react"
import { View, Animated } from "react-native"
import { Icon } from "react-native-elements"

export default function TabButton({ typeIcon, icon, focused, ...props }: any) {
    const AnimationState = {
        fromScale: new Animated.Value(1.2),
        tocale: new Animated.Value(2)
    }

    useEffect(() => {
        Animated.timing(AnimationState.fromScale, { toValue: 1.4, duration: 343, useNativeDriver: true }).start()
        Animated.timing(AnimationState.tocale, { toValue: 1.2, duration: 438, useNativeDriver: true }).start()
    })

    return (
        <View>
            <Animated.View style={focused ? { transform: [{ scale: AnimationState.fromScale }] } : { transform: [{ scale: 1.2 }] }}>
                <Icon
                    name={icon}
                    type={typeIcon}
                    {...props}
                />
            </Animated.View>
        </View>
    )
}
