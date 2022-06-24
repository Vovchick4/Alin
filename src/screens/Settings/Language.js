import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RadioButton } from 'react-native-paper'
import { useTranslation } from 'react-i18next';
import { useNavigation, useTheme } from '@react-navigation/native';
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, Loaders, Skeletons } from '../../components'
import { myColors } from '../../constants/constantColor'

const locales = [
    {
        code: "ua",
        name: "UA",
    },
    {
        code: "en",
        name: "EN",
    },
    {
        code: "pl",
        name: "PL",
    },
    {
        code: "ru",
        name: "RU",
    }
]
export default function Language() {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation()

    const { colors } = useTheme()

    const setLocaleLng = async (locale) => {
        i18n.changeLanguage(locale)

        try {
            await AsyncStorage.setItem('locale', locale)
        }
        catch (error) {
            console.log(error)
        }

        navigation.navigate("Settings")
    }

    return (
        <React.Fragment>
            <Container>
                <Text style={[styles.text, { color: colors.text }]}>{t('Language')}</Text>
            </Container>

            {locales && locales.map(locale => (
                <TouchableNativeFeedback key={locale.code} onPress={() => setLocaleLng(locale.code)}>
                    <View style={styles.localeContent}>
                        <RadioButton
                            onPress={() => setLocaleLng(locale.code)}
                            testID={locale.code}
                            value={i18n.language}
                            status={locale.code === i18n.language ? 'checked' : 'unchecked'}
                            color="white"
                        />
                        <Text style={styles.setLocaleName}>{locale.name}</Text>
                    </View>
                </TouchableNativeFeedback>
            ))}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    localeContent: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: myColors.dark,
        paddingLeft: 15
    },
    text: {
        color: Colors.white,
        fontSize: 20,
    },
    setLocaleName: {
        width: '80%',
        color: Colors.white,
        fontSize: 16,
        padding: 15,
        marginLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.white
    }
})
