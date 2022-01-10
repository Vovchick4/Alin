import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, FlatList, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Container } from '../components'
import { colors } from '../constants/constantColor'

const programs = [
    {
        id: 1,
        name: 'Citadel Inn',
        image: require("../images/citadelInn.webp"),
        description: 'Opsis Opsis Opsis',
        discount: 38,
        address: 'Lviv Opta',
        phone: '+380982815204'
    },
    {
        id: 2,
        name: 'Sonata Inn',
        image: require("../images/Sonata.webp"),
        description: 'Opsis Opsis',
        discount: 43,
        address: 'Lviv Opta',
        phone: '+380982815204'
    },
    {
        id: 3,
        name: 'Any Car Inn',
        image: require("../images/anyCar.webp"),
        description: 'Opsis Opsis',
        discount: 83,
        address: 'Lviv Opta',
        phone: '+380982815204'
    },
    {
        id: 4,
        name: 'EuroLviv Inn',
        image: require("../images/euroLviv.webp"),
        description: 'Opsis',
        discount: 34,
        address: 'Lviv Opta',
        phone: '+380982815204'
    }
]

export default function Loyalty({ navigation }) {
    return (
        <FlatList
            style={styles.flatList}
            data={programs}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(colors.danger)}
                    onPress={() => navigation.navigate("MoreInfo", { data: item })}>
                    <View style={styles.content}>
                        <Image style={styles.image} source={item.image} resizeMode="contain" />
                        <View style={{ width: '40%' }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.text} numberOfLines={2}>{item.description}</Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            <Text style={styles.text}>Discount</Text>
                            <Text style={styles.discount}>{item.discount}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )}
        />
    );
}

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 80
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderTopColor: colors.danger,
        paddingVertical: 20,
        paddingRight: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginHorizontal: 5
    },
    title: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: "700"
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20,
    },
    discount: {
        textAlign: 'center',
        color: colors.danger,
        fontSize: 24,
        fontWeight: "700"
    },
})