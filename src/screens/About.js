
import React, { useEffect, useState } from "react"
import { StyleSheet, Image, View, Text, TouchableNativeFeedback, Animated } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import MapView from 'react-native-maps'

import { Container, Loaders } from "../components"
import { myColors } from "../constants/constantColor"
import { dataSelectors } from "../redux/data"
import { useTheme } from "@react-navigation/native"

const tabStyles = {
    content: {
        active: { backgroundColor: myColors.danger },
        inActive: { backgroundColor: myColors.dark }
    }
}

const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export default function About() {
    const { colors } = useTheme()

    const cities = useSelector(dataSelectors.getCities)
    const dataLoading = useSelector(dataSelectors.getLoading)

    const [tabIndex, setTabIndex] = useState(0)
    const AnimateState = {
        fromOpacity: new Animated.Value(0)
    }

    useEffect(() => {
        Animated.timing(AnimateState.fromOpacity, { toValue: 1, duration: 438, useNativeDriver: true }).start()
    }, [tabIndex])

    return (
        <Container>
            {dataLoading && <Loaders />}

            {!dataLoading && (
                <React.Fragment>
                    <ScrollView>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                            <View style={styles.BoxTab}>
                                {cities.map((item, index) => (
                                    <View key={item.attributes.name} style={index !== 0 && { marginLeft: 8 }}>
                                        <TouchableNativeFeedback
                                            background={TouchableNativeFeedback.Ripple(myColors.danger)}
                                            onPress={() => setTabIndex(index)}>
                                            <View style={index === tabIndex ? styles.contentActive : styles.content}>
                                                <Text style={styles.tab}>{item.attributes.name}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        <View style={styles.cityInfoContent}>
                            {cities.map((item, index) => (
                                <View key={item.attributes.name} style={styles.BoxCity}>
                                    {index === tabIndex &&
                                        <Animated.View style={{ opacity: AnimateState.fromOpacity }}>
                                            <Image
                                                source={{ uri: IMAGES_PREFIX + item.attributes.Image.data.attributes.url }}
                                                resizeMode="cover"
                                                style={styles.image} />
                                            <View style={styles.contenTextInfoCity}>
                                                <Text style={[styles.cityText, { color: colors.text }]}>{item.attributes.address}</Text>
                                                <Text style={[styles.cityText, { color: colors.text }]}>{item.attributes.mail}</Text>
                                                <Text style={[styles.cityText, { color: colors.text }]}>{item.attributes.phone}</Text>
                                            </View>
                                            <View style={styles.contentCityMap}>
                                                <MapView style={styles.cityMap} />
                                            </View>
                                        </Animated.View>
                                    }
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </React.Fragment>
            )}
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
        marginTop: 8,
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
        marginTop: 8,
    },
    cityMap: {
        width: "100%",
        height: 250,
    }
})

