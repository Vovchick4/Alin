import React, { useEffect, useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler"
import axios from "axios"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { CarCard, Container, FiltersCars, Loaders, Modals } from '../components'
import { colors } from "../constants/constantColor"
// import { isCloseToBottom } from '../utils'

const sorts = [
    {
        id: 1,
        name: 'Abs price',
        value: 'asc',
    },
    {
        id: 2,
        name: 'Desc price',
        value: 'desc',
    }
]

const stateModals = {
    sortModal: 'SET_SORT',
}

export default function Rent({ navigation }) {
    const [resCars, setResCars] = useState([])
    const [categories, setCategories] = useState([])
    const [cities, setCities] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [activeCity, setActiveCity] = useState("Lviv")
    const [activeCategory, setActiveCategory] = useState('Econom')
    const [activeSubCategory, setActiveSubCategory] = useState('Benzin')
    const [activeSort, setActiveSort] = useState('asc')

    const [modalSort, setModalSort] = useState(null)

    useEffect(() => {
        setLoading(true);

        axios({
            url: `cars?filters[category][name][$eq]=${activeCategory}&filters[cities][name][$eq]=${activeCity}&filters[sub_category][name][$eq]=${activeSubCategory}&sort=deposit%3A${activeSort}`,
            method: 'GET',
            params: {
                populate: '*',
            },
        })
            .then((res) => {
                setResCars(res.data.data);
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false));
    }, [activeCategory, setActiveCategory, activeCity, setActiveCity, activeSubCategory, setActiveSubCategory, activeSort, setActiveSort])

    useEffect(() => {
        setLoading(true);

        axios({
            url: `categories`,
            method: 'GET',
        })
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false));
    }, [])

    useEffect(() => {
        setLoading(true);

        axios({
            url: `cities`,
            method: 'GET',
            params: {
                populate: "images"
            }
        })
            .then((res) => {
                setCities(res.data.data);
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false));
    }, [])

    useEffect(() => {
        setLoading(true);

        axios({
            url: `sub-categories`,
            method: 'GET',
        })
            .then((res) => {
                setSubCategories(res.data.data);
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false));
    }, [])

    function openSortModal() {
        setModalSort(stateModals.sortModal)
    }

    function closeModals() {
        setModalSort(null)
    }

    return (
        <React.Fragment>
            {loading && <Loaders />}

            {!loading &&
                <FlatList style={{ marginBottom: 80 }} data={resCars} keyExtractor={({ id }) => id}
                    ListHeaderComponent={
                        <Container>
                            <FiltersCars
                                cities={cities}
                                categories={categories}
                                subCategories={subCategories}
                                activeSubCategory={activeSubCategory}
                                activeCity={activeCity}
                                activeCategory={activeCategory}
                                setActiveCity={setActiveCity}
                                setActiveCategory={setActiveCategory}
                                setActiveSubCategory={setActiveSubCategory} />
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
                                        onPress={() => setActiveSort(sortItem.value)}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                paddingVertical: 8
                                            }}>
                                            <Text style={{ color: "white", fontSize: 18 }}>{sortItem.name}</Text>
                                            {activeSort === sortItem.value &&
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
                                onPress={() => navigation.navigate("Reserv", { data: item.attributes })}>
                                <CarCard {...item.attributes} />
                            </TouchableNativeFeedback>
                        </Container>
                    )} />
            }
        </React.Fragment>
    );
}
