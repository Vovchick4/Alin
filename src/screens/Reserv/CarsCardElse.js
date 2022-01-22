import React from 'react'
import { View, Text, Image, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { TabRouter, useNavigation } from '@react-navigation/native';
import { myColors } from '../../constants/constantColor';

export default function CarsCardElse({ car, cars, IMAGES_PREFIX }) {
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onPress={() => navigation.push("Reserv", { data: car.attributes, cars: cars })}>
            <View style={styles.contentBg}>
                {/* {car.attributes.images.data &&
                    <Image
                        style={{ width: '100%', height: 120 }}
                        width={120}
                        height={120}
                        source={{ uri: IMAGES_PREFIX + car.attributes.images.data[0]?.attributes.url }} resizeMode="contain" />
                } */}
                <Text numberOfLines={1} style={styles.name}>{car.attributes?.name}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    contentBg: {
        padding: 5,
        backgroundColor: myColors.dark,
        marginRight: 8
    },
    name: {
        width: 183,
        color: 'white',
        fontSize: 14,
        fontWeight: "700"
    }
})
