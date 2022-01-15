
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Linking, Image, TouchableNativeFeedback } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Container } from "../components";
import { myColors } from "../constants/constantColor";

const navigators = [
    {
        id: 1,
        name: 'Waze',
        text: 'GPS, Maps, Traffic Alerts & Live Navigation',
        image: require("../images/waze.webp"),
        link: 'https://play.google.com/store/apps/details?id=com.waze&hl=ru&gl=US'
    },
    {
        id: 2,
        name: 'Google Maps',
        image: require("../images/mapsGOOGLE.webp"),
        text: 'Places, Navigation & Traffic',
        link: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps&hl=ru&gl=US'
    },
    {
        id: 3,
        name: 'Maps Offline',
        image: require("../images/OFFmaps.webp"),
        text: 'MAPS.ME: Offline maps GPS Nav',
        link: 'https://play.google.com/store/apps/details?id=com.mapswithme.maps.pro&hl=ru&gl=US'
    },
]

export default function Navigators() {
    const { colors } = useTheme()

    return (
        <Container>
            <View style={styles.flexContent}>
                {navigators.map(navigate => (
                    <TouchableNativeFeedback
                        key={navigate.id}
                        background={TouchableNativeFeedback.Ripple(myColors.danger)}
                        onPress={() => Linking.openURL(navigate.link)}>
                        <View style={styles.content}>
                            <Image style={styles.image} source={navigate.image} resizeMode="contain" />
                            <Text style={[styles.text, { color: colors.text }]}>{navigate.name}</Text>
                            <Text style={[styles.description, { color: colors.text }]}>{navigate.text}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    flexContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        padding: 10
    },
    image: {
        width: 80,
        height: 80
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 4
    },
    description: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 18,
        marginTop: 4
    }
})