import React from "react"
import { View, Image } from "react-native"

// const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export const MySlide = ({ data }) => {
    return (
        <View>
            <Image source={{ uri: data?.path }} style={{ width: '100%', height: 250 }} resizeMode='contain' />
        </View>
    )
}
