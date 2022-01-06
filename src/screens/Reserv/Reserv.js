import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Modal } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Carousel from 'react-native-snap-carousel';

import { Container, BottomModal } from '../../components'
import ReservACar from './ReservACar'
import { colors } from '../../constants/constantColor'

const reservModal = {
    rentCar: 'RENT_CAR'
}
export default function Reserv({ navigation, route }) {
    const [tabIndex, setTabIndex] = useState(0)
    const [activeModal, setActiveModal] = useState(null)

    function rentCarModal() {
        setActiveModal(reservModal.rentCar)
    }

    function closeModals() {
        setActiveModal(null)
    }

    function onScrollHeaderTitle(event) {
        if (event.nativeEvent.contentOffset.y <= 43) {
            navigation.setOptions({ title: '' })
        } else {
            navigation.setOptions({ title: route.params.data.name })
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{}}>
                <Image source={item.image} style={{ width: 300, height: 200 }} resizeMode='contain' />
            </View>
        );
    }

    return (
        <ScrollView style={{ marginBottom: 120 }} onScroll={onScrollHeaderTitle}>
            <BottomModal visible={activeModal === reservModal.rentCar} onClose={closeModals}>
                <ReservACar
                    carName={route.params.data.name}
                    startPrice={route.params.data.price}
                    prices={route.params.data.prices}
                    carPhoto={route.params.data.photos[0].image}
                    deposit={route.params.data.deposit}
                    fuelDeposit={route.params.data.fuel_deposit}
                />
            </BottomModal>

            <Container>
                <Text style={styles.title}>{route.params.data.name}</Text>
                <Text style={styles.titlePrice}>{route.params.data.price}Є</Text>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Carousel
                        // ref={(c) => { this._carousel = c; }}
                        data={route.params.data.photos}
                        renderItem={renderItem}
                        sliderWidth={300}
                        itemWidth={300}
                    />
                </View>

                {/* {route.params.data.photos.map((car, index) => (
                    <View key={car.image} style={{ marginTop: 15 }}>
                        {tabIndex === index && <Image source={car.image} style={styles.imagePreview} resizeMode='cover' />}
                    </View>
                ))}

                <ScrollView style={styles.scrollTop} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {route.params.data.photos.map((car, index) => (
                        <TouchableHighlight key={car.image} onPress={() => setTabIndex(index)}>
                            <Image source={car.image} style={index !== 0 ? styles.imageTabs : styles.imageTabsOne} resizeMode='cover' />
                        </TouchableHighlight>
                    ))}
                </ScrollView> */}

                <Text style={styles.brand}>Марка: {route.params.data.brand}</Text>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 8, }}>
                    <View>
                        <Text style={styles.text}>Кількість пасажирів</Text>
                        <Text style={styles.text}>Кондиціонер</Text>
                        <Text style={styles.text}>Тип трансмісії</Text>
                        <Text style={styles.text}>Тип палива</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{route.params.data.countPeople}</Text>
                        <Text style={styles.text}>{route.params.data.conditioner && 'A/C'}</Text>
                        <Text style={styles.text}>{route.params.data.transmission}</Text>
                        <Text style={styles.text}>{route.params.data.fuel}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title}>Опис</Text>
                    <Text style={styles.desc}>
                        {route.params.data.desc}
                    </Text>
                </View>

                <View style={{ marginTop: 8 }}>
                    <Button title="Замовити" color={colors.danger} onPress={rentCarModal} />
                </View>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700',
    },
    titlePrice: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    brand: {
        color: Colors.white,
        fontSize: 20,
        marginTop: 43,
    },
    text: {
        color: Colors.white,
        fontSize: 18,
        marginTop: 8,
    },
    desc: {
        color: Colors.white,
        marginTop: 8,
    },
    scrollTop: {
        marginTop: 15
    },
    imagePreview: {
        width: '100%',
        height: 200
    },
    imageTabs: {
        width: 150,
        height: 100,
        marginLeft: 15,
    },
    imageTabsOne: {
        width: 150,
        height: 100,
    },
    contentTabs: {
        flexDirection: 'row',
    }
})
