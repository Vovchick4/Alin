import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { View, Text, TouchableNativeFeedback, StyleSheet, Image, Linking } from 'react-native';

import { Container } from '../components';
import { myColors } from '../constants/constantColor';

export default function Emergency({ navigation }: any) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const calls = [
        {
            id: 1,
            name: t('State Emergency Service'),
            image: require("../images/firefighter.png"),
            text: t("Tap to call State Emergency Service"),
            phone: '101'
        },
        {
            id: 2,
            name: t('Ambulance'),
            image: require("../images/ambulance.png"),
            text: t("Tap to call Ambulance"),
            phone: '103'
        },
        {
            id: 3,
            name: t('Police'),
            image: require("../images/police-car.png"),
            text: t("Tap to call Police"),
            phone: '102'
        },
        {
            id: 4,
            name: 'Alin',
            image: require("../images/alin-logo.png"),
            text: t("Tap to call Call Us"),
            phone: '+380987771600'
        }
    ]

    return (
        <React.Fragment>
            <ScrollView style={{ marginBottom: 80 }}>
                <Container>
                    {calls.map(call => (
                        <TouchableNativeFeedback
                            key={call.id}
                            background={TouchableNativeFeedback.Ripple(myColors.danger, false)}
                            onPress={() => Linking.openURL(`tel:${call.phone}`)}
                        >
                            <View style={call.id !== 1 ? styles.content : styles.contentWithoutBorderTop}>
                                <Image style={styles.image} source={call.image} resizeMode="contain" />
                                <View style={styles.contentText}>
                                    <Text style={[styles.text, { color: colors.text }]}>{call.name}</Text>
                                    <Text style={[styles.text, { color: colors.text }]}>{call.text}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    ))}
                </Container>
            </ScrollView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: myColors.danger,
    },
    contentWithoutBorderTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0,
    },
    contentText: {
        width: '50%',
    },
    image: {
        width: 120,
        height: 120
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
        fontWeight: '700'
    }
})
