import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';
import axios from "axios";
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, BottomModal, MyPaginCarousel } from '../../components'
import ReservACar from './ReservACar'
import { colors } from '../../constants/constantColor'
import { dataSelectors } from '../../redux/data';

import CarsCardElse from './CarsCardElse';

const reservModal = {
    rentCar: 'RENT_CAR'
}
const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'

export default function Reserv({ navigation, route }) {
    const cities = useSelector(dataSelectors.getCities)
    const additionalServices = useSelector(dataSelectors.getAdditionalServices)
    const dataLoading = useSelector(dataSelectors.getLoading)

    // const [tabIndex, setTabIndex] = useState(0)
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
                    cities={cities}
                    additionalServices={additionalServices}
                    loading={dataLoading}
                    carName={route.params.data.name}
                    startPrice={route.params.data.price}
                    prices={route.params.data.prices}
                    carPhoto={route.params.data.images.data[0]}
                    deposit={route.params.data.deposit}
                    fuelDeposit={route.params.data.fuel_deposit}
                />
            </BottomModal>

            <Container isBackGround>
                <Text style={styles.title}>{route.params.data.name}</Text>
                <Text style={styles.titlePrice}>{route.params.data.deposit}Є</Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: colors.gray
                }}>
                    <MyPaginCarousel entries={route.params.data.images.data} activeSlide={0} />
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
                    <Text style={styles.text}>{route.params.data.count}</Text>
                    <Text style={styles.text}>{route.params.data.conditioner && 'A/C'}</Text>
                    <Text style={styles.text}>{route.params.data.gearbox}</Text>
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
                    {route.params.data.content}
                </Text>

                <View style={{ marginTop: 12, width: 120 }}>
                    <Button testID="openModal" title="Замовити" color={colors.dark} onPress={rentCarModal} disabled={dataLoading} />
                </View>
            </Container>

            <Container>
                <Text style={styles.title}>Another cars</Text>
            </Container>

            {route.params.cars.length > 0 &&
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Container isBackGround>
                        {route.params.cars.map(car => (
                            <CarsCardElse key={car.id} car={car} cars={route.params.cars} IMAGES_PREFIX={IMAGES_PREFIX} />
                        ))}
                    </Container>
                </ScrollView>
            }
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
