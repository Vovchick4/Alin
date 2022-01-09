import React from "react"
import { View, Image } from "react-native"

export const MySlide = ({ data }) => {
    return (
        <View>
            <Image source={data.image} style={{ width: '100%', height: 250 }} resizeMode='cover' />
        </View>
    )
}
