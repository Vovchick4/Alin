import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import axios from "axios";
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Container, BottomModal, MyPaginCarousel, Loaders } from '../../components'
import ReservACar from './ReservACar'
import { myColors } from '../../constants/constantColor'
import { dataSelectors } from '../../redux/data';

import CarsCardElse from './CarsCardElse';

const reservModal = {
    rentCar: 'RENT_CAR'
}
const IMAGES_PREFIX = 'https://alin-back.herokuapp.com'

export default function Reserv({ navigation, route }) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const cities = useSelector(dataSelectors.getCities)
    const additionalServices = useSelector(dataSelectors.getAdditionalServices)
    const dataLoading = useSelector(dataSelectors.getLoading)
    const [loading, setLoading] = useState(false)

    // const [tabIndex, setTabIndex] = useState(0)
    const [activeModal, setActiveModal] = useState(null)

    function rentCarModal() {
        setActiveModal(reservModal.rentCar)
    }

    function closeModals() {
        setActiveModal(null)
    }

    function orderCar(data) {
        setLoading(true)

        axios({
            method: 'POST',
            url: '/mail',
            data
        })
            .then((res) => {
                closeModals()
            })
            .catch((error) => {
                alert(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function onScrollHeaderTitle(event) {
        if (event.nativeEvent.contentOffset.y <= 43) {
            navigation.setOptions({ title: '', })
        } else {
            navigation.setOptions({ title: route.params.data.name, })
        }
    }

    return (
        <ScrollView style={{ marginBottom: 80 }} onScroll={onScrollHeaderTitle}>
            <BottomModal visible={activeModal === reservModal.rentCar} onClose={closeModals}>
                {loading && <Loaders isOverlay isCentered />}
                <ReservACar
                    onSubmit={orderCar}
                    loading={loading}
                    cities={cities}
                    additionalServices={additionalServices}
                    carName={route.params.data.name}
                    startPrice={route.params.data.price}
                    prices={route.params.data.prices}
                    carPhoto={route.params.data.images.data && route.params.data.images.data[0]}
                    deposit={route.params.data.deposit}
                    fuelDeposit={route.params.data.fuel_deposit}
                />
            </BottomModal>

            <View>
                <Container>
                    <Text style={[styles.title, { marginBottom: 10, textAlign: 'center', color: colors.text }]}>{route.params.data.name}</Text>
                    {/* <Text style={[styles.titlePrice, { textAlign: 'center', color: colors.text, marginVertical: 10 }]}>
                        {t("Per Day")}:
                    </Text> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {route.params.data.prices.map((price, i) => (
                            <View key={i} style={[{}, i === 0 ? { marginRight: 10 } : { marginHorizontal: 10 }]}>
                                <Text style={styles.title}>{price.days}</Text>
                                <Text style={[styles.title, { textAlign: 'center' }]}>{price.money}€</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={[styles.titlePrice, { textAlign: 'center', color: colors.text, marginTop: 10 }]}>
                        {t("Deposit")}: {route.params.data.deposit}€
                    </Text>
                </Container>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: myColors.gray
                }}>
                    {route.params.data.images.data &&
                        <MyPaginCarousel entries={route.params.data.images.data} activeSlide={0} />
                    }
                </View>
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

            <Container>
                <Text style={[styles.brand, { color: colors.text }]}>{t("Brand")}: {route.params.data.brand}</Text>
            </Container>

            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 15,
                backgroundColor: myColors.gray
            }}>
                <View style={{ padding: 15 }}>
                    <Text style={styles.text}>{t("Number of passengers")}</Text>
                    <Text style={styles.text}>{t("Сonditioner")}</Text>
                    <Text style={styles.text}>{t("Type gearbox")}</Text>
                    <Text style={styles.text}>{t("Type fuel")}</Text>
                </View>
                <View style={{ padding: 15 }}>
                    <Text style={styles.text}>{route.params.data.count}</Text>
                    <Text style={styles.text}>{route.params.data.conditioner && 'A/C'}</Text>
                    <Text style={styles.text}>{route.params.data.gearbox}</Text>
                    <Text style={styles.text}>{route.params.data.fuel}</Text>
                </View>
            </View>

            <Container>
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>{t("Description")}</Text>
                </View>
            </Container>

            <Container isBackGround>
                <Text style={[styles.desc, { color: colors.text }]}>
                    {route.params.data.content}
                </Text>

                <View style={{ marginTop: 12, width: 120 }}>
                    <Button testID="openModal" title={t("Rent")} color={myColors.dark} onPress={rentCarModal} disabled={dataLoading} />
                </View>
            </Container>

            <Container>
                <Text style={[styles.title, { color: colors.text }]}>{t("Another cars")}</Text>
            </Container>

            {route.params.cars.length > 0 &&
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Container isBackGround>
                        <View style={{ flexDirection: 'row' }} >
                            {route.params.cars.map(car => (
                                <CarsCardElse key={car.id} car={car} cars={route.params.cars} IMAGES_PREFIX={IMAGES_PREFIX} />
                            ))}
                        </View>
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
