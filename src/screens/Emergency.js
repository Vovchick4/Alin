import React, { useEffect } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, Image, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';

import { Container, Loaders } from '../components';
import { colors } from '../constants/constantColor';
import { dataOperations, dataSelectors } from "../redux/data"

const calls = [
    {
        id: 1,
        name: 'State Emergency Service',
        image: require("../images/firefighter.png"),
        text: "Tap to State Emergency Service",
        phone: '101'
    },
    {
        id: 2,
        name: 'Ambulance',
        image: require("../images/ambulance.png"),
        text: "Tap to Ambulance",
        phone: '103'
    },
    {
        id: 3,
        name: 'Police',
        image: require("../images/police-car.png"),
        text: "Tap to Police",
        phone: '102'
    },
    {
        id: 4,
        name: 'Alin',
        image: require("../images/alin-logo.png"),
        text: "Tap to Call Us",
        phone: '+380987771600'
    }
]

export default function Emergency({ navigation }) {
    const dispatch = useDispatch()
    const dataLoading = useSelector(dataSelectors.getLoading)

    useEffect(() => {
        dispatch(dataOperations.citiesFetchAll())
        dispatch(dataOperations.addtionalServicesFetchAll())
        dispatch(dataOperations.categoriesFetchAll())
        dispatch(dataOperations.subCategoriesFetchAll())
    }, [])

    return (
        <React.Fragment>
            {dataLoading && <Loaders />}
            <ScrollView style={{ marginBottom: 80 }}>
                <Container>
                    {calls.map(call => (
                        <TouchableNativeFeedback
                            key={call.id}
                            background={TouchableNativeFeedback.Ripple(colors.danger)}
                            onPress={() => Linking.openURL(`tel:${call.phone}`)}
                        >
                            <View style={call.id !== 1 ? styles.content : styles.contentWithoutBorderTop}>
                                <Image style={styles.image} source={call.image} resizeMode="contain" />
                                <View style={styles.contentText}>
                                    <Text style={styles.text}>{call.name}</Text>
                                    <Text style={styles.text}>{call.text}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    ))}
                </Container>
            </ScrollView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: colors.danger,
    },
    contentWithoutBorderTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0,
    },
    contentText: {
        width: '50%',
    },
    image: {
        width: 120,
        height: 120
    },
    text: {
        textAlign: 'center',
        color: Colors.white,
        fontWeight: '700'
    }
})
