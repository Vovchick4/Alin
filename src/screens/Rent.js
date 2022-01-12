import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { CarCard, Container, FiltersCars, Modals } from '../components'
import { colors } from "../constants/constantColor";
// import { isCloseToBottom } from '../utils'

const cars = [
    {
        id: 1,
        category_id: 4,
        name: "Volkswagen Polo or similar",
        price: 28,
        brand: "Volkswagen",
        countPeople: "5",
        conditioner: true,
        transmission: "Автомат",
        deposit: 800,
        fuel_deposit: 150,
        fuel: "Газ",
        prices: [
            { days: 'VIP 1+', money: 34, money_deposit: '' },
            { days: '30+', money: 43, money_deposit: '20' },
            { days: '8-29', money: 48, money_deposit: '22' },
            { days: '3-7', money: 83, money_deposit: '25' },
            { days: '1-2', money: 38, money_deposit: '26' }
        ],
        photos: [
            { image: require("../images/vols.webp") },
            { image: require("../images/vols2.jpg") },
            { image: require("../images/vols3.jpg") },
        ],
        desc: `Volkswagen Polo Sedan - one of the leaders in the segment of so-called "budget sedans" since the cars which will perfectly cope both with mountain passes and with cozy travels to the Ukrainian cities.`
    },
    {
        id: 2,
        category_id: 4,
        name: "Ford Focus HatchBack or similar",
        price: 43,
        brand: "Ford",
        countPeople: "5",
        conditioner: true,
        transmission: "Автомат",
        deposit: 800,
        fuel_deposit: 150,
        fuel: "Диззель",
        prices: [
            { days: 'VIP 1+', money: 39, money_deposit: '' },
            { days: '30+', money: 35, money_deposit: '20' },
            { days: '8-29', money: 42, money_deposit: '22' },
            { days: '3-7', money: 50, money_deposit: '25' },
            { days: '1-2', money: 58, money_deposit: '26' }
        ],
        photos: [
            { image: require("../images/fordfocus.jpg") },
            { image: require("../images/fordfocus2.jpg") },
            { image: require("../images/fordfocus3.png") },
        ],
        desc: `Ford Focus HatchBack - one of the leaders in the segment of so-called "budget sedans" since the cars which will perfectly cope both with mountain passes and with cozy travels to the Ukrainian cities.`
    }
]

const categories = [
    {
        id: 1,
        category_id: 1,
        name: 'Econom',
    },
    {
        id: 2,
        category_id: 2,
        name: 'Average',
    },
    {
        id: 3,
        category_id: 3,
        name: 'Buissnes',
    },
    {
        id: 4,
        category_id: 4,
        name: 'SUV',
    },
]

const sorts = [
    {
        id: 1,
        name: 'Abs price',
    },
    {
        id: 2,
        name: 'Desc price'
    }
]

const stateModals = {
    sortModal: 'SET_SORT',
}

export default function Rent({ navigation }) {
    const [activeCategory, setActiveCategory] = useState(1)
    const [resCars, setResCars] = useState([])
    const [modalSort, setModalSort] = useState(null)
    const [activeSort, setActiveSort] = useState('Abs price')

    useEffect(() => {
        setResCars(cars.filter(car => car.category_id === activeCategory))
    }, [activeCategory, setActiveCategory])

    function openSortModal() {
        setModalSort(stateModals.sortModal)
    }

    function closeModals() {
        setModalSort(null)
    }

    return (
        <FlatList style={{ marginBottom: 80 }} data={resCars} keyExtractor={({ id }) => id}
            ListHeaderComponent={
                <Container>
                    <FiltersCars categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text
                            style={{ padding: 8, borderRadius: 8, color: Colors.white, backgroundColor: colors.dark }}>
                            {resCars.length} Cars
                        </Text>
                        <TouchableNativeFeedback onPress={openSortModal} background={TouchableNativeFeedback.Ripple(colors.danger, true)}>
                            <Icon type="font-awesome-5" name="sort-amount-up-alt" color={Colors.white} />
                        </TouchableNativeFeedback>
                    </View>

                    <Modals visible={modalSort === stateModals.sortModal} onClose={closeModals}>
                        <Text style={{ color: "white", fontSize: 18, marginBottom: 20 }}>Choose sort!</Text>
                        {sorts.map(sortItem => (
                            <TouchableOpacity
                                key={sortItem.name}
                                onPress={() => setActiveSort(sortItem.name)}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingVertical: 8
                                    }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>{sortItem.name}</Text>
                                    {activeSort === sortItem.name &&
                                        <Icon type="font-awesome-5" name="check" color={colors.danger} />
                                    }
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Modals>
                </Container>
            }
            renderItem={({ item }) => (
                <Container>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(colors.danger)}
                        onPress={() => navigation.navigate("Reserv", { data: item })}>
                        <CarCard {...item} />
                    </TouchableNativeFeedback>
                </Container>
            )} />
    );
}
