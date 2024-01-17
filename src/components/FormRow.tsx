import React from "react"
import { View, StyleSheet } from "react-native"

export default function FormRow({ children }: any) {
    return (
        <View style={styles.formRow}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    formRow: {
        flexDirection: 'column',
        justifyContent: "space-between",
        marginVertical: 10
    }
})
