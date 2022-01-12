import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView, Pressable } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, Select } from '.'
import { colors } from '../constants/constantColor'

const cities = [
    {
        city_id: 1,
        name: "Lviv",
    },
    {
        city_id: 2,
        name: "Harkiv",
    },
    {
        city_id: 3,
        name: "Kyiv",
    },
    {
        city_id: 4,
        name: "Ivano-Frankovsk",
    },
    {
        city_id: 5,
        name: "Bukowel",
    }
]
export default function FiltersCars({ categories, activeCategory, setActiveCategory }) {

    function pressCategory(name) {
        setActiveCategory(name)
    }
    return (
        <React.Fragment>
            <ScrollView horizontal={true} style={styles.content}>
                {categories.map(category => (
                    <Pressable
                        key={category.id}
                        onPress={() => pressCategory(category.category_id)}
                        style={category.category_id === activeCategory ? styles.textContentActive : styles.textContent}>
                        <Text style={styles.text}>{category.name}</Text>
                    </Pressable>

                ))}
            </ScrollView>

            <View style={styles.selectContent}>
                <Select mode="modal" data={cities} selectedValue="Lviv" />
                <Select mode="modal" data={
                    [
                        {
                            city_id: 1,
                            name: 'Choose values ...'
                        },
                        {
                            city_id: 2,
                            name: 'Fuil'
                        },
                        {
                            city_id: 3,
                            name: 'Diesel'
                        },
                        {
                            city_id: 4,
                            name: 'Gas'
                        },
                        {
                            city_id: 5,
                            name: 'Outlet'
                        }
                    ]
                }
                    selectedValue="Lviv" />
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 4,
        backgroundColor: Colors.darker,
        borderRadius: 8
    },
    textContent: {
        width: 100,
        paddingVertical: 5,
        marginRight: 8,
        borderRadius: 8
    },
    selectContent: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    textContentActive: {
        width: 100,
        paddingVertical: 5,
        marginRight: 8,
        backgroundColor: Colors.dark,
        borderRadius: 8
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
    },
})

