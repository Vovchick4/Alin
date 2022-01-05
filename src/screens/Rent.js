import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { FlatList, ScrollView, TouchableNativeFeedback } from "react-native-gesture-handler";
import { CarCard } from '../components'

const cars = [
    {
        id: 1,
        name: "Volkswagen Polo or similar",
        price: 28,
        brand: "Volkswagen",
        countPeople: "5",
        conditioner: true,
        transmission: "Автомат",
        deposit: 800,
        fuel_deposit: 150,
        fuel: "Газ",
        // price: [
        //     { days: 'VIP 1+', money: 34, money_deposit: '' },
        //     { days: '30+', money: 43, money_deposit: '20' },
        //     { days: '8-29', money: 48, money_deposit: '22' },
        //     { days: '3-7', money: 83, money_deposit: '25' },
        //     { days: '1-2', money: 38, money_deposit: '26' }
        // ],
        photos: [
            { image: require("../images/vols.webp") },
            { image: require("../images/vols2.jpg") },
            { image: require("../images/vols3.jpg") },
        ],
        desc: `Volkswagen Polo Sedan - one of the leaders in the segment of so-called "budget sedans" since the cars which will perfectly cope both with mountain passes and with cozy travels to the Ukrainian cities.`
    },
    {
        id: 2,
        name: "Ford Focus HatchBack or similar",
        price: 43,
        brand: "Ford",
        countPeople: "5",
        conditioner: true,
        transmission: "Автомат",
        deposit: 800,
        fuel_deposit: 150,
        fuel: "Диззель",
        // price: [
        //     { days: 'VIP 1+', money: 39, money_deposit: '' },
        //     { days: '30+', money: 35, money_deposit: '20' },
        //     { days: '8-29', money: 42, money_deposit: '22' },
        //     { days: '3-7', money: 50, money_deposit: '25' },
        //     { days: '1-2', money: 58, money_deposit: '26' }
        // ],
        photos: [
            { image: require("../images/fordfocus.jpg") },
            { image: require("../images/fordfocus2.jpg") },
            { image: require("../images/fordfocus3.png") },
        ],
        desc: `Ford Focus HatchBack - one of the leaders in the segment of so-called "budget sedans" since the cars which will perfectly cope both with mountain passes and with cozy travels to the Ukrainian cities.`
    }
]

export default function Rent({ navigation }) {

    return (
        <FlatList style={{ marginBottom: 120, }} data={cars} keyExtractor={({ id }) => id} renderItem={({ item }) => (
            <ScrollView>
                <TouchableNativeFeedback onPress={() => navigation.navigate("Reserv", { data: item })}>
                    <CarCard {...item} />
                </TouchableNativeFeedback>
            </ScrollView>
        )} />
    );
}
