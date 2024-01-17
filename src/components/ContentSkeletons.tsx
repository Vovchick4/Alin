import React, { useEffect } from 'react'
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@react-navigation/native'

const { width } = Dimensions.get('window')
const AnimatedBG = Animated.createAnimatedComponent(LinearGradient)

export default function ContentSkeletons({ height = 150, isWhite }: any) {
    const { colors } = useTheme()

    const animatedBGValue = new Animated.Value(0)

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedBGValue, { toValue: 1, duration: 1200, easing: Easing.linear, useNativeDriver: true })
        ).start()
    })

    const translateX = animatedBGValue.interpolate({ inputRange: [0, 1], outputRange: [-width, width] })

    return (
        <View style={{ width, height }}>
            <AnimatedBG
                colors={colors.text !== '#ffffff' ?
                    ['rgba(255,255,255,0)', 'rgba(255,255,255, 0.1)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.0)']
                    : ['rgba(0,0,0,0.0)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ transform: [{ translateX }] }}
            />
        </View>
    );
}
