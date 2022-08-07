import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View, Text, Platform } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen"
import { Skeletons } from "..";
import { myColors } from "../../constants/constantColor"

export default function Select({ loading = false, isRentFilterCity = false, isOnlyReturn = false, mode = "dropdown", data, selectedValue, onChange, enabled = true, label, ...pickerProps }) {
    return (
        <View style={{ flexDirection: "column" }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.content}>
                {!loading ?
                    <Picker
                        mode={mode}
                        style={enabled ? styles.content : styles.contentEnabled}
                        selectedValue={selectedValue}
                        onValueChange={onChange}
                        enabled={enabled}
                        {...pickerProps}>
                        {isRentFilterCity && data && data.map((item, index) => (
                            index !== 3 &&
                            <Picker.Item
                                key={item?.id}
                                color={Platform.OS !== "android" ? "#fff8dc" : "#00000"}
                                label={item?.title ? item?.title : item?.name}
                                value={isRentFilterCity ? item : item?.title ? item?.title : item?.name} />
                        ))}
                        {!isRentFilterCity && !isOnlyReturn && data && data.map((item, index) => (
                            index !== 3 && item?.active && item.only_return != 1 &&
                            <Picker.Item
                                key={item?.id}
                                color={Platform.OS !== "android" ? "#fff8dc" : "#00000"}
                                label={item?.title ? item?.title : item?.name}
                                value={isRentFilterCity ? item : item?.title ? item?.title : item?.name} />

                        ))}

                        {!isRentFilterCity && isOnlyReturn && data && data.map((item, index) => (
                            index !== 3 && item?.active &&
                            <Picker.Item
                                key={item?.id}
                                color={Platform.OS !== "android" ? "#fff8dc" : "#00000"}
                                label={item?.title ? item?.title : item?.name}
                                value={isRentFilterCity ? item : item?.title ? item?.title : item?.name} />

                        ))}
                    </Picker>
                    : <Skeletons height={48} />}
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