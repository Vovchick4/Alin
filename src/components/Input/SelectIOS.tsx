import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Text, Button, ActionSheetIOS } from "react-native";
import { Skeletons } from "..";

export default function SelectIOS({
    loading = false,
    data = [],
    dataDropDowns = [],
    RenderSelectedValue = (item: any) => item,
    selectedValue,
    onChange,
    enabled = true,
    label,
    ...pickerProps }: any) {
    const { colors } = useTheme()

    function openDropDownIOS() {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: dataDropDowns,
                userInterfaceStyle: colors.text !== "#ffffff" ? 'light' : 'dark',
            },
            choosenIndex => {
                if (data[choosenIndex] !== selectedValue) {
                    onChange(data[choosenIndex])
                }
            }
        )
    }

    return (
        <View style={{ flexDirection: "column" }}>
            {label && <Text>{label}</Text>}
            <View style={styles.content}>
                {!loading ?
                    <Button disabled={loading} color={"white"} title={RenderSelectedValue(selectedValue)} onPress={openDropDownIOS} />
                    : <Skeletons height={48} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "black"
    },
    btnIOS: {
        backgroundColor: "white"
    }
})