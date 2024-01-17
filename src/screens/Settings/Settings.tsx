import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, Skeletons } from '../../components'
import { myColors } from '../../constants/constantColor'

export default function Settings({ navigation }: any) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const dataSettings = [
        {
            id: 1,
            name: t('Language'),
            icon: <Icon type="font-awesome-5" name="globe" color={Colors.white} />,
            naivgate: 'Language'
        },
        {
            id: 2,
            name: t('Theme'),
            icon: colors.text === "#ffffff" ?
                <Icon type="font-awesome-5" name="moon" color={Colors.white} /> :
                <Icon type="font-awesome-5" name="sun" color={Colors.white} />,
            naivgate: 'Theme'
        },
    ]

    const dataHelps = [
        {
            id: 1,
            name: t('Ask a Question'),
            icon: <Icon type="font-awesome-5" name="info-circle" color={Colors.white} />,
            link: "https://alin.ua/contacts#sendQuestUS"
            // naivgate: 'AskQuestion',
        },
        {
            id: 2,
            name: `Alin FAQ`,
            icon: <Icon type="font-awesome-5" name="list" color={Colors.white} />,
            link: "https://alin.ua/faq",
            // naivgate: 'Faq',
        },
        {
            id: 3,
            name: t('About') + ' Alin',
            icon: <Icon type="font-awesome-5" name="question-circle" color={Colors.white} />,
            link: "https://alin.ua/about-us",
        },
        {
            id: 4,
            name: t('Loyalty Program'),
            icon: <Icon type="font-awesome-5" name="tags" color={Colors.white} />,
            link: "https://alin.ua/loyalty-program",
            // naivgate: 'ProgramLoality',
        },
        {
            id: 5,
            name: t('Privacy Policy'),
            icon: <Icon type="font-awesome-5" name="check-circle" color={Colors.white} />, // user-shield (icon)
            link: "https://alin.ua/confidential-policy",
            // naivgate: 'PrivacyPolicy',
        }
    ]

    return (
        <ScrollView>
            <Container>
                <Text style={[styles.text, { color: colors.text }]}>{t('Settings')}</Text>
            </Container>
            <View style={styles.content}>
                {dataSettings.map((set, index) => (
                    <TouchableNativeFeedback
                        key={set.id}
                        onPress={() => navigation.navigate(set.naivgate)}
                        background={TouchableNativeFeedback.Ripple(myColors.danger, false)}>
                        <View style={index === 0 ? [styles.textContent, { marginTop: 0 }] : styles.textContent}>
                            {set.icon}
                            <Text style={styles.setName}>{set.name}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </View>

            <Container>
                <Text style={[styles.text, { color: colors.text }]}>{t('Help')}</Text>
            </Container>

            <View style={styles.content}>
                {dataHelps.map((set, index) => (
                    <TouchableNativeFeedback
                        key={set.id}
                        onPress={() => {
                            Linking.openURL(set.link)
                        }}
                        background={TouchableNativeFeedback.Ripple(myColors.danger, false)}>
                        <View style={index === 0 ? [styles.textContent, { marginTop: 0 }] : styles.textContent}>
                            {set.icon}
                            <Text style={styles.setName}>{set.name}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: myColors.dark
    },
    textContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    text: {
        color: Colors.white,
        fontSize: 20,
    },
    setName: {
        width: "80%",
        color: Colors.white,
        fontSize: 16,
        paddingBottom: 10,
        marginLeft: 43,
        borderBottomWidth: 1,
        borderBottomColor: Colors.white
    },
})