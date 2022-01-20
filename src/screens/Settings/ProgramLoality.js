import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, StyleSheet, ScrollView } from 'react-native';

import { Container } from '../../components';

export default function ProgramLoality({ route }) {
    const colors = useTheme()

    return (
        <ScrollView>
            <Container>
                <Text style={[styles.title, { color: colors.text }]}>{route.params.data?.data?.attributes?.Title}</Text>
                <Text style={[styles.text, { color: colors.text }]}>
                    {route.params.data?.data?.attributes?.Content}
                </Text>
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