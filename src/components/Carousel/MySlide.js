import React from "react"
import { View, Image } from "react-native"

const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export const MySlide = ({ data }) => {
    return (
        <View>
            <Image source={{ uri: IMAGES_PREFIX + data.attributes.url }} style={{ width: '100%', height: 250 }} resizeMode='contain' />
        </View>
    )
}
