
import React, { useEffect, useState } from "react"
import { StyleSheet, Image, View, Text, TouchableNativeFeedback, Animated, Dimensions, Pressable } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSelector } from "react-redux"

import { Container, Loaders } from "../components"
import { myColors } from "../constants/constantColor"
import { dataSelectors } from "../redux/data"
import { useTheme } from "@react-navigation/native"
import { Icon } from "react-native-elements"
import { Colors } from "react-native/Libraries/NewAppScreen"

const tabStyles = {
    content: {
        active: { backgroundColor: myColors.danger },
        inActive: { backgroundColor: myColors.dark }
    }
}

// const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
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
    }, [cities, tabIndex])

    return (
        <React.Fragment>
            {dataLoading && <Loaders />}

            {!dataLoading && (
                <React.Fragment>
                    <ScrollView>
                        <Container>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                                <View style={styles.BoxTab}>
                                    {cities && cities.map((item: any, index: number) => (
                                        <View key={item.id} style={index !== 0 && { marginLeft: 8 }}>
                                            <Pressable onPress={() => setTabIndex(index)}>
                                                <View style={index === tabIndex ? styles.contentActive : styles.content}>
                                                    <Text style={styles.tab}>{item.title}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </Container>

                        {cities && cities.map((item: any, index: number) => (
                            <View key={item.id} style={styles.BoxCity}>
                                {index === tabIndex &&
                                    <Animated.View style={{ opacity: AnimateState.fromOpacity }}>
                                        {/* <Image
                                                source={{ uri: item.attributes.Image?.data?.attributes.url }}
                                                resizeMode="cover"
                                                style={styles.image} /> */}
                                        <Container>
                                            <View style={styles.contenTextInfoCity}>
                                                <View style={styles.contentIcons}>
                                                    <Icon type="font-awesome-5" name="map-marked" size={18} color={colors.text} />
                                                    <Text style={[styles.cityText, { color: colors.text }]}>
                                                        {item.address}
                                                    </Text>
                                                </View>
                                                <View style={styles.contentIcons}>
                                                    <Icon type="font-awesome-5" name="envelope" size={18} color={colors.text} />
                                                    <Text style={[styles.cityText, { color: colors.text }]}>
                                                        {item.email}
                                                    </Text>
                                                </View>
                                                <View style={styles.contentIcons}>
                                                    <Icon type="font-awesome-5" name="phone" size={18} color={colors.text} />
                                                    <Text style={[styles.cityText, { color: colors.text }]}>
                                                        {item.phone}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Container>
                                        <View style={styles.contentCityMap}>
                                            {item?.image?.path &&
                                                <Image
                                                    source={{ uri: item?.image?.path }}
                                                    resizeMode="cover"
                                                    style={styles.image} />}
                                        </View>
                                    </Animated.View>
                                }
                            </View>
                        ))}
                    </ScrollView>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    BoxTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        width: 150,
        minWidth: "100%",
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
    BoxCity: {
        flexDirection: 'column',
    },
    contentIcons: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cityText: {
        marginLeft: 15,
        lineHeight: 30,
        fontSize: 16,
        color: '#ffff',
        textAlign: 'left'
    },
    contenTextInfoCity: {
        marginTop: 8,
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
        height: 340,
    }
})

