import React from "react";
import { Picker, StyleSheet, View, Text } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen"
import { colors } from "../../constants/constantColor"

export default function Select({ selectedValue, onChange, enabled = true, label, ...pickerProps }) {
    return (
        <View style={{ flexDirection: "column" }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                <Picker
                    mode="dropdown"
                    style={enabled ? styles.content : styles.contentEnabled}
                    selectedValue={selectedValue}
                    onValueChange={onChange}
                    enabled={enabled}
                    {...pickerProps}>
                    <Picker.Item label="Lviv" value="Lviv" />
                    <Picker.Item label="Harkiv" value="Harkiv" />
                    <Picker.Item label="Kyiv" value="Kyiv" />
                    <Picker.Item label="Ivano-Frankovsk" value="Ivano-Frankovsk" />
                    <Picker.Item label="Bukowel" value="Bukowel" />
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: Colors.white,
        fontSize: 16,
        marginVertical: 8
    },
    content: {
        width: 150,
        color: Colors.white,
        backgroundColor: colors.dark,
        borderRadius: 8
    },
    contentEnabled: {
        width: 150,
        color: Colors.darker,
        backgroundColor: colors.dark,
        borderRadius: 8
    }
})