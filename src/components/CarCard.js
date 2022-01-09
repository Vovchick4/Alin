import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { Container } from "."
import { colors } from '../constants/constantColor'

export default function CarCard({ name, price, desc, photos }) {

    return (
        <View style={styles.CarBox}>
            <Container>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.textPrice}>Per Day <Text style={styles.carPrice}>{price}</Text> Є</Text>
            </Container>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {photos.map((photo, index) => (
                    <Image key={photo.image}
                        style={index !== 0 ? { width: 340, height: 200, marginLeft: 20 } :
                            { width: 340, height: 200, marginLeft: 0 }}
                        width={340} height={200} source={photo.image} resizeMode='cover' />
                ))}
            </ScrollView>

            <Container>
                <Text style={styles.desc} numberOfLines={2}>
                    {desc}
                </Text>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    CarBox: {
        paddingVertical: 15,
        color: Colors.white,
        backgroundColor: colors.gray
    },
    title: {
        marginBottom: 5,
        color: Colors.white,
        fontSize: 20
    },
    textPrice: {
        color: Colors.white,
        fontSize: 17
    },
    carPrice: {
        fontWeight: "700",
        color: colors.danger,
        fontSize: 17
    },
    desc: {
        marginTop: 5,
        color: Colors.white,
        fontSize: 14
    },
})
