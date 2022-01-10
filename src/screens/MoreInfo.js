import React from 'react'
import { Text, View, StyleSheet, Image, TouchableNativeFeedback, ScrollView, Linking } from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container } from '../components'
import { colors } from '../constants/constantColor'

export default function MoreInfo({ route }) {
    const openMap = async (address, city, zipCode,) => {
        const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
        const provider = Platform.OS === 'ios' ? 'apple' : 'google'
        const link = `http://maps.${provider}.com/?daddr=${destination}`;

        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) Linking.openURL(link);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <ScrollView style={{ marginBottom: 80 }}>
            <Container>
                <View style={styles.content}>
                    <Image style={styles.image} source={route.params.data.image} resizeMode="contain" />
                    <Text style={styles.title}>{route.params.data.name}</Text>

                    <View style={{
                        flexDirection: "row", alignItems: 'center'
                    }}>
                        <Text style={styles.discountText}>Discount: </Text>
                        <Text style={styles.discount}>{route.params.data.discount}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(colors.danger)}
                        onPress={() => openMap(route.params.data.address, "Lviv")}>
                        <View>
                            <Text style={styles.text}>Address:
                                <Text style={{ color: colors.danger }}> {route.params.data.address}</Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(colors.danger)}
                        onPress={() => Linking.openURL(`tel:${route.params.data.phone}`)}>
                        <View>
                            <Text style={styles.text}>Phone:
                                <Text style={{ color: colors.danger }}> {route.params.data.phone}</Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <Text style={styles.title}>Description</Text>
                <Text style={styles.text}>{route.params.data.description}</Text>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(colors.danger)}
                    onPress={() => openMap(route.params.data.address, "Lviv")}>
                    <View>
                        <Text style={styles.title}>Tap to route:</Text>
                        <View style={styles.icon}>
                            <Icon type="font-awesome-5" name="route" size={150} color={Colors.white} />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        marginBottom: 80,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 5,
        textAlign: 'left',
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
    text: {
        marginVertical: 8,
        textAlign: 'left',
        color: Colors.white,
        fontSize: 17,
    },
    image: {
        width: 120,
        height: 120,
        marginVertical: 15
    },
    icon: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    discountText: {
        color: Colors.white,
        fontSize: 20,
    },
    discount: {
        color: colors.danger,
        fontSize: 24,
        fontWeight: "700"
    },
})

