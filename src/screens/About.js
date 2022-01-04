
import React, { useEffect, useState } from "react"
import { StyleSheet, Image, View, Text, TouchableNativeFeedback, Dimensions, Animated } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import MapView from 'react-native-maps'

import { Container } from "../components"
import { colors } from "../constants/constantColor"

const tabStyles = {
    content: {
        active: { backgroundColor: colors.danger },
        inActive: { backgroundColor: colors.dark }
    }
}

const cities = [
    {
        name: 'Lviv',
        image: require('../images/ukraine-lviv-cityscape-wallpaper-preview.jpg'),
        street: 'street Lubinska 196',
        email: 'lviv@alin.ua',
        phone: '+38 098 777 16 00',
    },
    {
        name: 'Kyiv',
        image: require('../images/mqdefault.jpg'),
        street: 'Boryspil Airport',
        email: 'kyiv@alin.ua',
        phone: '+38 098 777 15 00',
    },
]

export default function About() {
    const [tabIndex, setTabIndex] = useState(0)
    const AnimateState = {
        fromOpacity: new Animated.Value(0)
    }

    useEffect(() => {
        Animated.timing(AnimateState.fromOpacity, { toValue: 1, duration: 438, useNativeDriver: true }).start()
    }, [tabIndex])

    return (
        <Container>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                <View style={styles.BoxTab}>
                    {cities.map((item, index) => (
                        <View key={item.image} style={index !== 0 && { marginLeft: 43 }}>
                            <TouchableNativeFeedback onPress={() => setTabIndex(index)}>
                                <View style={index === tabIndex ? styles.contentActive : styles.content}>
                                    <Text style={styles.tab}>{item.name}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.cityInfoContent}>
                {cities.map((item, index) => (
                    <View key={item.name} style={styles.BoxCity}>
                        {index === tabIndex &&
                            <Animated.View style={{ opacity: AnimateState.fromOpacity }}>
                                <Image source={item.image} resizeMode="cover" style={styles.image}>
                                </Image>
                                <View style={styles.contenTextInfoCity}>
                                    <Text style={styles.cityText}>{item.street}</Text>
                                    <Text style={styles.cityText}>{item.email}</Text>
                                    <Text style={styles.cityText}>{item.phone}</Text>
                                </View>
                                <View style={styles.contentCityMap}>
                                    <MapView style={styles.cityMap} />
                                </View>
                            </Animated.View>
                        }
                    </View>
                ))}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    BoxTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        width: 120,
        padding: 10,
        backgroundColor: tabStyles.content.inActive.backgroundColor
    },
    contentActive: {
        width: 120,
        padding: 10,
        backgroundColor: tabStyles.content.active.backgroundColor
    },
    tab: {
        textAlign: 'center',
        color: '#ffff'
    },
    cityInfoContent: {
        marginTop: 30,
    },
    BoxCity: {
        flexDirection: 'column',
    },
    cityText: {
        lineHeight: 30,
        color: '#ffff',
        textAlign: 'center'
    },
    contenTextInfoCity: {
        marginTop: 40,
    },
    image: {
        width: '100%',
        height: 200,
    },
    contentCityMap: {
        marginTop: 40,
    },
    cityMap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

