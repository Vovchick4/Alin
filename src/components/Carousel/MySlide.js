import React from "react"
import { View, Image, Dimensions } from "react-native"

export const MySlide = ({ data }) => {
    return (
        <View>
            <Image source={data.image} style={{ width: Dimensions.get('window').width, height: 250 }} resizeMode='cover' />
        </View>
    )
}
