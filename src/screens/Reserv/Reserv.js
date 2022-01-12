import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
// import Carousel from 'react-native-snap-carousel';

import { Container, BottomModal, MyPaginCarousel } from '../../components'
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
            navigation.setOptions({ title: '', })
        } else {
            navigation.setOptions({ title: route.params.data.name, })
        }
    }

    return (
        <ScrollView style={{ marginBottom: 100 }} onScroll={onScrollHeaderTitle}>
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

            <Container isBackGround>
                <Text style={styles.title}>{route.params.data.name}</Text>
                <Text style={styles.titlePrice}>{route.params.data.price}Є</Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: colors.gray
                }}>
                    <MyPaginCarousel entries={route.params.data.photos} activeSlide={0} />
                </View>
            </Container>

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

            <Container>
                <Text style={styles.brand}>Марка: {route.params.data.brand}</Text>
            </Container>

            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 15,
                backgroundColor: colors.gray
            }}>
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

            <Container>
                <View>
                    <Text style={styles.title}>Опис</Text>
                </View>
            </Container>

            <Container isBackGround>
                <Text style={styles.desc}>
                    {route.params.data.desc}
                </Text>

                <View style={{ marginTop: 12, width: 120 }}>
                    <Button testID="openModal" title="Замовити" color={colors.dark} onPress={rentCarModal} />
                </View>
            </Container>

            <Container>
                <Text style={styles.title}>Another cars</Text>
            </Container>

            <Container isBackGround>

            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    titlePrice: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    brand: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        marginVertical: 8,
    },
    desc: {
        color: Colors.white,
        // marginTop: 8,
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
