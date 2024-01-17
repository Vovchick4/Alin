import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Select, Skeletons } from '../../components'
import SelectIOS from '../../components/Input/SelectIOS'

export default function FiltersCars(
    {
        loading,
        setPage,
        setCars,
        cities,
        categories,
        activeCity,
        setActiveCity,
        subCategories,
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory
    }: any
) {
    const { t } = useTranslation()
    function pressCategory(name: any) {
        setPage(1)
        setCars([])
        setActiveCategory(name)
    }

    return (
        <React.Fragment>
            <ScrollView horizontal={true} style={styles.content}>
                {!loading ?
                    <Pressable
                        onPress={() => pressCategory({ label: "All Categories", value: 0 })}
                        style={"All Categories" === activeCategory.label ? styles.textContentActive : styles.textContent}>
                        <Text numberOfLines={1} style={styles.text}>{t("All Categories")}</Text>
                    </Pressable>
                    : <Skeletons height={30} />}

                {!loading && categories ?
                    categories.map((category: any) => (
                        <Pressable
                            key={category.id}
                            onPress={() => pressCategory({ label: category.name, value: category.id })}
                            style={category.name === activeCategory.label ? styles.textContentActive : styles.textContent}>
                            <Text numberOfLines={1} style={styles.text}>{category.name}</Text>
                        </Pressable>

                    )) : <Skeletons height={30} />}
            </ScrollView>

            <View style={styles.selectContent}>
                {Platform.OS === "android" ? (
                    <>
                        {cities.length !== 0 && <Select
                            loading={loading}
                            mode="modal"
                            data={cities}
                            renderOptions={({ title }: any) => title}
                            renderValues={(item: any) => item}
                            selectedValue={activeCity}
                            onChange={(itemValue: any) => { setPage(1), setCars([]), setActiveCity(itemValue) }}
                        />}
                        {subCategories.length !== 0 && <Select
                            loading={loading}
                            mode="modal"
                            data={subCategories}
                            renderOptions={({ name }: any) => name}
                            renderValues={(item: any) => item}
                            selectedValue={activeSubCategory}
                            onChange={(itemValue: any) => { setPage(1), setCars([]), setActiveSubCategory(itemValue) }} />}
                    </>
                ) : (
                    <>
                        {cities.length !== 0 && <SelectIOS data={cities} dataDropDowns={cities.map((item: any) => item.title)} selectedValue={activeCity} RenderSelectedValue={(item: any) => item.title} onChange={(itemValue: any) => { setPage(1), setCars([]), setActiveCity(itemValue) }} />}
                        {subCategories.length !== 0 && <SelectIOS data={subCategories} dataDropDowns={subCategories.map((item: any) => item.name)} selectedValue={activeSubCategory} RenderSelectedValue={(item: any) => item.name} onChange={(itemValue: any) => { setPage(1), setCars([]), setActiveSubCategory(itemValue) }} />}
                    </>
                )}
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

