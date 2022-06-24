import React from 'react'
import { View, Text, Image, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { TabRouter, useNavigation } from '@react-navigation/native';
import { myColors } from '../../constants/constantColor';

export default function CarsCardElse({ car, cars }) {
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onPress={() => navigation.push("Reserv", { data: car, cars: cars })}>
            <View style={styles.contentBg}>
                {car.photo?.path &&
                    <Image
                        style={{ width: '100%', height: 120 }}
                        width={120}
                        height={120}
                        source={{ uri: car.photo?.path }} resizeMode="cover" />
                }
                <Text numberOfLines={1} style={styles.name}>{car?.name}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    contentBg: {
        backgroundColor: myColors.dark,
        marginRight: 8
    },
    name: {
        width: 183,
        padding: 8,
        color: 'white',
        fontSize: 14,
        fontWeight: "700"
    }
})
