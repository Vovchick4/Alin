import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView, Pressable } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, Select } from '.'
import { colors } from '../constants/constantColor'

export default function FiltersCars(
    {
        cities,
        categories,
        activeCity,
        setActiveCity,
        subCategories,
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory
    }
) {

    function pressCategory(name) {
        setActiveCategory(name)
    }
    return (
        <React.Fragment>
            <ScrollView horizontal={true} style={styles.content}>
                {categories.map(category => (
                    <Pressable
                        key={category.id}
                        onPress={() => pressCategory(category.attributes.name)}
                        style={category.attributes.name === activeCategory ? styles.textContentActive : styles.textContent}>
                        <Text style={styles.text}>{category.attributes.name}</Text>
                    </Pressable>

                ))}
            </ScrollView>

            <View style={styles.selectContent}>
                <Select mode="modal" data={cities} selectedValue={activeCity} onChange={(value) => { setActiveCity(value) }} />
                <Select
                    mode="modal"
                    data={subCategories}
                    selectedValue={activeSubCategory}
                    onChange={(value) => { setActiveSubCategory(value) }} />
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

