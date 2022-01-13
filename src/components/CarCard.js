import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { Container } from "."
import { colors } from '../constants/constantColor'

const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export default function CarCard({ name, deposit, content, images }) {
    return (
        <View style={styles.CarBox}>
            <Container isBackGround>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.textPrice}>Per Day <Text style={styles.carPrice}>{deposit}</Text> Є</Text>
            </Container>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {images.data.map((image, index) => (
                    <Image key={image.id}
                        style={index !== 0 ? { width: 340, height: 200, marginLeft: 20 } :
                            { width: 340, height: 200, marginLeft: 0 }}
                        width={340} height={200} source={{ uri: IMAGES_PREFIX + image.attributes.url }} resizeMode='contain' />
                ))}
            </ScrollView>

            <Container isBackGround>
                <Text style={styles.desc} numberOfLines={2}>
                    {content}
                </Text>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    CarBox: {
        color: Colors.white,
        backgroundColor: colors.gray,
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
