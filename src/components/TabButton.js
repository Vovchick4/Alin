import React, { useRef } from "react"
import { Animated } from "react-native"
import { Icon } from "react-native-elements"

export default function TabButton({ typeIcon, icon, focused, ...props }) {
    const value = useRef(new Animated.Value(0)).current

    const startAnimate = () => {
        Animated.timing(value, { toValue: 1.3 }).start()
    }

    return (
        <Animated.View>
            <Icon
                style={focused ? { transform: [{ scale: 1.3 }] } : { transform: [{ scale: 1 }] }}
                name={icon}
                type={typeIcon}
                {...props}
            />
        </Animated.View>
    )
}
