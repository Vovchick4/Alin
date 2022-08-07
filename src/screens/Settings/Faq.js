import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { Container, Loaders } from '../../components'
import { myColors } from '../../constants/constantColor';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Faq({ route }) {
    const { colors } = useTheme()
    const { t, i18n } = useTranslation()
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios({ method: "GET", url: `/faq/${i18n.language}` })
            .then((res) => setFaqs(res.data))
            .catch((err) => alert(err.message))
            .finally(() => setLoading(false))
    }, [i18n])

    if (loading) return <Loaders isCentered />

    return (
        <ScrollView>
            <Container>
                <Text style={[styles.title, { color: colors.text }]}>{t("")}</Text>
                <View style={{ backgroundColor: myColors.danger, paddingHorizontal: 15 }}>
                    {faqs.map(({ id, name, description }) => (
                        <View key={id}>
                            <Text>{name}</Text>
                            <Text>
                                {description}
                            </Text>
                        </View>
                    ))}
                </View>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
    text: {
        fontSize: 14,
        marginTop: 8
    }
})
