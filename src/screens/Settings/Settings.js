import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container } from '../../components'
import { myColors } from '../../constants/constantColor'

export default function Settings({ navigation }) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const dataSetings = [
        {
            id: 1,
            name: 'Language',
            icon: <Icon type="font-awesome-5" name="globe" color={Colors.white} />,
            naivgate: 'Language'
        },
        {
            id: 2,
            name: 'Theme',
            icon: colors.text === "#ffffff" ?
                <Icon type="font-awesome-5" name="moon" color={Colors.white} /> :
                <Icon type="font-awesome-5" name="sun" color={Colors.white} />,
            naivgate: 'Theme'
        },
    ]

    const dataHelps = [
        {
            id: 1,
            name: 'Ask a Question',
            icon: <Icon type="font-awesome-5" name="info-circle" color={Colors.white} />,
            naivgate: 'AskQuestion'
        },
        {
            id: 2,
            name: 'Alin FAQ',
            icon: <Icon type="font-awesome-5" name="question-circle" color={Colors.white} />,
            naivgate: 'Faq'
        },
        {
            id: 3,
            name: 'Privacy Policy',
            icon: <Icon type="font-awesome-5" name="check-circle" color={Colors.white} />, // user-shield (icon)
            naivgate: 'PrivacyPolicy'
        }
    ]

    return (
        <React.Fragment>
            <Container>
                <Text style={[styles.text, { color: colors.text }]}>{t('Settings')}</Text>
            </Container>
            <View style={styles.content}>
                {dataSetings.map((set, index) => (
                    <TouchableNativeFeedback key={set.id} onPress={() => navigation.navigate(set.naivgate)}>
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
                    <TouchableNativeFeedback key={set.id} onPress={() => navigation.navigate(set.naivgate)}>
                        <View style={index === 0 ? [styles.textContent, { marginTop: 0 }] : styles.textContent}>
                            {set.icon}
                            <Text style={styles.setName}>{set.name}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </View>
        </React.Fragment>
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