import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, Loaders, Skeletons } from '../../components'
import { myColors } from '../../constants/constantColor'

const { width } = Dimensions.get('window')

export default function Settings({ navigation }) {
    const { colors } = useTheme()
    const { t, i18n } = useTranslation()

    const [policyData, setPolicyData] = useState({})
    const [faqData, setFaqData] = useState({})
    const [programLoality, setProgramLoality] = useState({})
    const [aboutAlin, setAboutAlin] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        axios({
            method: 'GET',
            url: `alin-policy-guard?locale=${i18n.language}`,
        })
            .then((res) => {
                setPolicyData(res.data);
            })
            .catch((err) => alert(err))

        axios({
            method: 'GET',
            url: `alin-faq?locale=${i18n.language}`,
        })
            .then((res) => {
                setFaqData(res.data);
            })
            .catch((err) => alert(err))

        axios({
            method: 'GET',
            url: `alin-program-loality?locale=${i18n.language}`,
        })
            .then((res) => {
                setProgramLoality(res.data);
            })
            .catch((err) => alert(err))

        axios({
            method: 'GET',
            url: `alin-back?locale=${i18n.language}`,
        })
            .then((res) => {
                setAboutAlin(res.data);
            })
            .catch((err) => alert(err))
    }, [i18n.language])

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
            naivgate: 'AskQuestion',
            params: 'none'
        },
        {
            id: 2,
            name: `Alin FAQ`,
            icon: <Icon type="font-awesome-5" name="list" color={Colors.white} />,
            naivgate: 'Faq',
            params: faqData
        },
        {
            id: 3,
            name: t('About') + ' Alin',
            icon: <Icon type="font-awesome-5" name="question-circle" color={Colors.white} />,
            naivgate: 'AboutAlin',
            params: aboutAlin
        },
        {
            id: 4,
            name: t('Loality Program'),
            icon: <Icon type="font-awesome-5" name="tags" color={Colors.white} />,
            naivgate: 'ProgramLoality',
            params: programLoality
        },
        {
            id: 5,
            name: t('Privacy Policy'),
            icon: <Icon type="font-awesome-5" name="check-circle" color={Colors.white} />, // user-shield (icon)
            naivgate: 'PrivacyPolicy',
            params: policyData
        }
    ]

    return (
        <React.Fragment>
            <Container>
                <Text style={[styles.text, { color: colors.text }]}>{t('Settings')}</Text>
            </Container>
            <View style={styles.content}>
                {dataSettings.map((set, index) => (
                    <TouchableNativeFeedback
                        key={set.id}
                        onPress={() => navigation.navigate(set.naivgate)}
                        background={TouchableNativeFeedback.Ripple(myColors.danger)}>
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
                {!loading && <Skeletons height={340} />}

                {loading &&
                    dataHelps.map((set, index) => (
                        <TouchableNativeFeedback
                            key={set.id}
                            onPress={() => navigation.navigate(set.naivgate, { data: set.params })}
                            background={TouchableNativeFeedback.Ripple(myColors.danger)}
                        >
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