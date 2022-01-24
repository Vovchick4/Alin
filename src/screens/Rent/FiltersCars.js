import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Select, Skeletons } from '../../components'

export default function FiltersCars(
    {
        loading,
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
    const { t } = useTranslation()
    function pressCategory(name) {
        setActiveCategory(name)
    }

    return (
        <React.Fragment>
            <ScrollView horizontal={true} style={styles.content}>
                {!loading ?
                    <Pressable
                        onPress={() => pressCategory("All Categories")}
                        style={"All Categories" === activeCategory ? styles.textContentActive : styles.textContent}>
                        <Text numberOfLines={1} style={styles.text}>{t("All Categories")}</Text>
                    </Pressable>
                    : <Skeletons height={30} />}

                {!loading && categories ?
                    categories.map(category => (
                        <Pressable
                            key={category.id}
                            onPress={() => pressCategory(category?.attributes?.name)}
                            style={category?.attributes?.name === activeCategory ? styles.textContentActive : styles.textContent}>
                            <Text numberOfLines={1} style={styles.text}>{category?.attributes?.title}</Text>
                        </Pressable>

                    )) : <Skeletons height={30} />}
            </ScrollView>

            <View style={styles.selectContent}>
                <Select loading={loading} mode="modal" data={cities} selectedValue={activeCity} onChange={(value) => { setActiveCity(value) }} />
                <Select
                    loading={loading}
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
        marginBottom: 15,
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

