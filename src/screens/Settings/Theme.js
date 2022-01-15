import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet } from 'react-native'
import { Switch } from 'react-native-paper'
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container } from '../../components'
import { ThemeContext } from '../../context/contentextTheme';
import { myColors } from '../../constants/constantColor'


export default function Theme() {
    const { t } = useTranslation()

    const { toggleTheme } = React.useContext(ThemeContext)

    const { colors } = useTheme()

    return (
        <React.Fragment>
            <Container>
                <Text style={[styles.text, { color: colors.text }]}>{t("Theme")}</Text>
            </Container>

            <View style={styles.preference}>
                <Text style={styles.setLocaleName}>Dark Theme</Text>
                <Switch
                    value={colors.text === "#ffffff" ? true : false}
                    onValueChange={toggleTheme}
                />
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    localeContent: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: myColors.dark,
        paddingLeft: 15,
    },
    text: {
        fontSize: 20,
    },
    setLocaleName: {
        color: Colors.white,
        fontSize: 16,
        padding: 15,
        marginLeft: 8
    },
    preference: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.white,
        backgroundColor: myColors.dark,
    }
})

