import React from 'react'
import { useTheme } from '@react-navigation/native'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Markdown from 'react-native-easy-markdown';

import { Container } from '../../components'
import { myColors } from '../../constants/constantColor';

export default function Faq({ route }) {
    const { colors } = useTheme()

    return (
        <ScrollView>
            <Container>
                <Text style={[styles.title, { color: colors.text }]}>{route.params.data?.data?.attributes?.Title}</Text>
                <View style={{ backgroundColor: myColors.danger, paddingHorizontal: 15 }}>
                    <Markdown>
                        {route.params.data?.data?.attributes?.Content}
                    </Markdown>
                </View>
                {/* <Text style={[styles.text, { color: colors.text }]}>
                    {route.params.data?.data?.attributes?.Content}
                </Text> */}
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
