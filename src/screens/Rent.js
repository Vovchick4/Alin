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
        fuel: "Газ",
        photos: [
            { image: require("../images/vols.webp") },
            { image: require("../images/vols2.jpg") },
            { image: require("../images/vols3.jpg") },
        ],
        desc: `Volkswagen Polo Sedan - one of the leaders in the segment of so-called "budget sedans" since th cars which will perfectly cope both with mountain passes and with cozy travels to the Ukrainian cities.`
    },
    {
        id: 2,
        name: "Ford Focus HatchBack or similar",
        price: 43,
        brand: "Ford",
        countPeople: "5",
        conditioner: true,
        transmission: "Автомат",
        fuel: "Диззель",
        photos: [
            { image: require("../images/fordfocus.jpg") },
            { image: require("../images/fordfocus2.jpg") },
            { image: require("../images/fordfocus3.png") },
        ],
        desc: `Ford Focus HatchBack - one of the leaders in the segment of so-called "budget sedans" since th cars which will perfectly cope both with mountain passes and with cozy travels to the Ukrainian cities.`
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
