
import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableNativeFeedback, Dimensions } from "react-native"
import MapView from 'react-native-maps'

import { Container } from "../components"

const tabStyles = {
    content: {
        inActive: { backgroundColor: 'gray' },
        active: { backgroundColor: 'red' }
    }
}

const cities = [
    {
        name: 'Lviv',
        street: 'street Lubinska 196',
        email: 'lviv@alin.ua',
        phone: '+38 098 777 16 00',
    },
    {
        name: 'Kyiv',
        street: 'Boryspil Airport',
        email: 'kyiv@alin.ua',
        phone: '+38 098 777 15 00',
    }
]

export default function About() {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Container>
            <View style={styles.BoxTab}>
                {cities.map((item, index) => (
                    <TouchableNativeFeedback key={item.name} onPress={() => setTabIndex(index)}>
                        <View style={index === tabIndex ? styles.contentActive : styles.content}>
                            <Text style={styles.tab}>{item.name}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </View>

            <View style={styles.cityInfoContent}>
                {cities.map((item, index) => (
                    <View key={item.name} style={styles.BoxCity}>
                        {index === tabIndex &&
                            <>
                                <View>
                                    <Text style={styles.cityText}>{item.street}</Text>
                                    <Text style={styles.cityText}>{item.email}</Text>
                                    <Text style={styles.cityText}>{item.phone}</Text>
                                </View>
                                <View style={styles.contentCityMap}>
                                    <MapView style={styles.cityMap} />
                                </View>
                            </>
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
        marginTop: 40,
    },
    BoxCity: {
        flexDirection: 'column',
    },
    cityText: {
        lineHeight: 30,
        color: '#ffff',
        textAlign: 'center'
    },
    contentCityMap: {
        marginTop: 40,
    },
    cityMap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

