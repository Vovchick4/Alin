import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Container, Loaders } from '../../components'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
    const { colors } = useTheme()
    const { t, i18n } = useTranslation()

    const [privacy, setPrivacy] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios({ method: "GET", url: `/blogpost/alin-privacy-policy/${i18n.language}` })
            .then((res) => setPrivacy(res.data))
            .catch((err) => alert(err.message))
            .finally(() => setLoading(false))
    }, [i18n])

    if (loading) return <Loaders isCentered />

    return (
        <ScrollView>
            <Container>
                <Text style={[styles.title, { color: colors.text }]}>{privacy?.title}</Text>
                <Text style={[styles.text, { color: colors.text }]}>
                    {privacy?.content}
                </Text>
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