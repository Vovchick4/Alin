import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Markdown from 'react-native-easy-markdown';

import { Container } from '../../components';
import { myColors } from '../../constants/constantColor';
import { useTranslation } from 'react-i18next';

export default function ProgramLoality() {
    const { colors } = useTheme()
    // const { t, i18n } = useTranslation()

    // const [privacy, setPrivacy] = useState({})
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setLoading(true)
    //     axios({ method: "GET", url: `/blogpost/rent-a-car-in-lviv-from-alin-company/${i18n.language}` })
    //         .then((res) => setPrivacy(res.data))
    //         .catch((err) => alert(err.message))
    //         .finally(() => setLoading(false))
    // }, [i18n])

    return (
        <ScrollView>
            <Container>
                <Text style={[styles.title, { color: colors.text }]}>XD</Text>
                <View style={{ backgroundColor: myColors.danger, paddingHorizontal: 15 }}>
                    <Markdown>

                    </Markdown>
                </View>
                {/* <Text style={[styles.text, { color: colors.text }]}>
                    {route.params.data?.data?.attributes?.Content}
                </Text> */}
            </Container>
        </ScrollView>
    );
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