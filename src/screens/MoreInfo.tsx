import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View, StyleSheet, Image, TouchableNativeFeedback, ScrollView, Linking, Alert, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container } from '../components'
import { myColors } from '../constants/constantColor'

// const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export default function MoreInfo({ route }: any) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const openMap = async (address: string, city: string, zipCode?: string) => {
        const destination = encodeURIComponent(`${address}`);
        const provider = Platform.OS === 'ios' ? 'apple' : 'google'
        const link = `http://maps.${provider}.com/?daddr=${destination}`;

        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) Linking.openURL(link);
        } catch (error) {
            Alert.alert(
                'Error!',
                JSON.stringify((error as Error).message || ""),
                [
                    {
                        text: 'OK'
                    }
                ]
            )
        }
    }

    return (
        <ScrollView style={{ marginBottom: 80 }}>
            <Container>
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        source={{ uri: route.params.data.images[0]?.path }}
                        resizeMode="contain" />
                    <Text style={[styles.title, { color: colors.text }]}>{route.params.data.name}</Text>

                    <View style={{
                        flexDirection: "row", alignItems: 'center'
                    }}>
                        <Text style={[styles.discountText, { color: colors.text }]}>{t('Discount')}: </Text>
                        <Text style={styles.discount}>{route.params.data?.discount}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(myColors.danger, false)}
                        onPress={() => openMap(route.params.data?.adress, "Lviv")}>
                        <View>
                            <Text style={[styles.text, { color: colors.text }]}>{t('Address')}:
                                <Text style={{ color: myColors.danger }}> {route.params.data?.adress}</Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(myColors.danger, false)}
                        onPress={() => Linking.openURL(`tel:${route.params.data.phone}`)}>
                        <View>
                            <Text style={[styles.text, { color: colors.text }]}>{t('Phone')}:
                                <Text style={{ color: myColors.danger }}> {route.params.data?.phone}</Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <Text style={[styles.title, { color: colors.text }]}>{t('Discription')}</Text>
                <Text style={[styles.text, { color: colors.text }]}>{route.params.data?.description}</Text>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(myColors.danger, false)}
                    onPress={() => openMap(route.params.data?.adress, "Lviv")}>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>{t('Tap to route')}:</Text>
                        <View style={styles.icon}>
                            <Icon type="font-awesome-5" name="route" size={150} color={colors.text} />
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
        color: myColors.danger,
        fontSize: 24,
        fontWeight: "700"
    },
})

