import React, { useEffect, useRef } from "react"
import { TextInput, Animated, StyleSheet, Text } from "react-native"

import { Colors } from "react-native/Libraries/NewAppScreen"
import { myColors } from "../../constants/constantColor"

export default function Input({ label, error, value, onChange, placeholder, keyboardType, ...inputProps }) {
    const fromOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (error) {
            Animated.timing(fromOpacity, { toValue: 1, duration: 438, useNativeDriver: true }).start()
        }
    }, [error])

    return (
        <React.Fragment>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={!error ? styles.input : styles.inputError}
                placeholderTextColor="#939598"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                keyboardType={keyboardType}
                {...inputProps} />
            {/* <Animated.View style={{ opacity: fromOpacity }}> */}
            <Text style={error && styles.error}>{error && error}</Text>
            {/* </Animated.View> */}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    label: {
        color: Colors.white,
        fontSize: 16,
    },
    input: {
        color: Colors.white,
        fontSize: 16,
        backgroundColor: myColors.gray,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 8
    },
    inputError: {
        color: myColors.danger,
        fontSize: 16,
        backgroundColor: myColors.gray,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 8
    },
    error: {
        color: Colors.white,
        fontSize: 16,
        textShadowColor: 'red',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 8,
        marginTop: 4
    }
})

