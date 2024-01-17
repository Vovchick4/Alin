import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function DrawerContent(props: any) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <ImageBackground source={require("../images/alin.webp")} resizeMode="contain" style={styles.logoImage}>
                    {/* <Text>Main news</Text> */}
                </ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            {/* <Drawer.Section>
                <DrawerItem label={ } />
            </Drawer.Section> */}
        </View>
    )
}

const styles = StyleSheet.create({
    logoImage: {
        flex: 1,
        justifyContent: "center",
        height: 300,
        marginHorizontal: 20
    }
})
