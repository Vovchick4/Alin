import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useTheme } from "@react-navigation/native"

import { Container } from "../../components"
import { myColors } from '../../constants/constantColor'

const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export default function CarCard({ name, deposit, content, images }) {
    const { colors } = useTheme()

    return (
        <View style={[{ background: colors.background }, styles.CarBox]}>
            <Container isBackGround>
                <Text style={[styles.title, { color: colors.text }]}>{name}</Text>
                <Text style={[styles.textPrice, { color: colors.text }]}>Per Day <Text style={styles.carPrice}>{deposit}</Text> Є</Text>
            </Container>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {images.data.map((image, index) => (
                    <Image key={image.id}
                        style={index !== 0 ? { width: 334, height: 200, marginLeft: 20 } :
                            { width: 334, height: 200, marginLeft: 0 }}
                        width={334} height={200} source={{ uri: IMAGES_PREFIX + image.attributes.url }} resizeMode='contain' />
                ))}
            </ScrollView>

            <Container isBackGround>
                <Text style={[styles.desc, { color: colors.text }]} numberOfLines={2}>
                    {content}
                </Text>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    CarBox: {
        borderWidth: 1,
        borderColor: myColors.danger
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
        color: myColors.danger,
        fontSize: 17
    },
    desc: {
        marginTop: 5,
        color: Colors.white,
        fontSize: 14
    },
})
