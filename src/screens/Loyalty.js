import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, FlatList, Image } from 'react-native'
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Loaders } from '../components'
import { colors } from '../constants/constantColor'

const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'
export default function Loyalty({ navigation }) {
    const [programs, setPrograms] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);

        axios({
            url: `loality-programs`,
            method: 'GET',
            params: {
                populate: 'logo'
            }
        })
            .then((res) => {
                setPrograms(res.data.data);
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false));
    }, [])

    return (
        <React.Fragment>
            {loading && <Loaders />}

            {!loading &&
                <FlatList
                    style={styles.flatList}
                    data={programs}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple(colors.danger)}
                            onPress={() => navigation.navigate("MoreInfo", { data: item.attributes })}>
                            <View style={styles.content}>
                                <Image style={styles.image} source={{ uri: IMAGES_PREFIX + item.attributes.logo.data.attributes.url }} resizeMode="contain" />
                                <View style={{ width: '40%' }}>
                                    <Text style={styles.title}>{item.attributes.title}</Text>
                                    <Text style={styles.text} numberOfLines={2}>{item.attributes.description}</Text>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Text style={styles.text}>Discount</Text>
                                    <Text style={styles.discount}>{item.attributes.discount}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                />
            }
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 80,
        // paddingHorizontal: 15
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderWidth: 2,
        // borderRadius: 8,
        borderTopColor: colors.danger,
        paddingVertical: 10,
        paddingRight: 5,
    },
    image: {
        width: 80,
        height: 80,
        marginHorizontal: 5
    },
    title: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 18,
        fontWeight: "700"
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 16,
    },
    discount: {
        textAlign: 'center',
        color: colors.danger,
        fontSize: 20,
        fontWeight: "700"
    },
})