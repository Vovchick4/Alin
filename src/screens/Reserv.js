import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Container } from '../components'

export default function Reserv({ route }) {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <ScrollView style={{ marginBottom: 120 }} onScroll={(e) => console.log(e)}>
            <Container>
                <Text style={styles.title}>{route.params.data.name}</Text>
                {route.params.data.photos.map((car, index) => (
                    <View key={car.image} style={{ marginTop: 15 }}>
                        {tabIndex === index && <Image source={car.image} style={styles.imagePreview} resizeMode='cover' />}
                    </View>
                ))}

                <ScrollView style={styles.scrollTop} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {route.params.data.photos.map((car, index) => (
                        <TouchableHighlight key={car.image} onPress={() => setTabIndex(index)}>
                            <Image source={car.image} style={index !== 0 ? styles.imageTabs : styles.imageTabsOne} resizeMode='cover' />
                        </TouchableHighlight>
                    ))}
                </ScrollView>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
    scrollTop: {
        marginTop: 15
    },
    imagePreview: {
        width: '100%',
        height: 200
    },
    imageTabs: {
        width: 150,
        height: 100,
        marginLeft: 15,
    },
    imageTabsOne: {
        width: 150,
        height: 100,
    },
    contentTabs: {
        flexDirection: 'row',
    }
})
