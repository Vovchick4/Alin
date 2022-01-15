import React from "react";
import { Picker, StyleSheet, View, Text } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen"
import { myColors } from "../../constants/constantColor"

export default function Select({ mode = "dropdown", data, selectedValue, onChange, enabled = true, label, ...pickerProps }) {
    return (
        <View style={{ flexDirection: "column" }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                <Picker
                    mode={mode}
                    style={enabled ? styles.content : styles.contentEnabled}
                    selectedValue={selectedValue}
                    onValueChange={onChange}
                    enabled={enabled}
                    {...pickerProps}>
                    {data.map(item => (
                        <Picker.Item key={item.id} label={item.attributes.name} value={item.attributes.name} />
                    ))}
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
        backgroundColor: myColors.gray,
        borderRadius: 8
    },
    contentEnabled: {
        width: 150,
        color: myColors.dark,
        backgroundColor: myColors.gray,
        borderRadius: 8
    }
})