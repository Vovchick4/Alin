import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler"
import { myColors } from "../../constants/constantColor"
import axios from "axios"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { Container, Loaders, Modals, Skeletons } from '../../components'
import CarCard from "./CarCard"
import FiltersCars from "./FiltersCars";
import { dataSelectors } from '../../redux/data'
import { useTheme } from "@react-navigation/native";
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
    brandCar: 'BRAND_CAR',
    sortModal: 'SET_SORT',
}

export default function Rent({ navigation }) {
    const { colors } = useTheme()
    const { t } = useTranslation()

    const [resCars, setResCars] = useState([])
    const [loading, setLoading] = useState(false)

    const cities = useSelector(dataSelectors.getCities)
    const categories = useSelector(dataSelectors.getCategoires)
    const subCategories = useSelector(dataSelectors.getSubCategoires)
    const brand = useSelector(dataSelectors.getBrand)

    const [activeCity, setActiveCity] = useState("Lviv")
    const [activeBrand, setActiveBrand] = useState('All Brands')
    const [activeCategory, setActiveCategory] = useState('Econom')
    const [activeSubCategory, setActiveSubCategory] = useState('Benzin')
    const [activeSort, setActiveSort] = useState('asc')

    const [modal, setModal] = useState(null)

    useEffect(() => {
        setLoading(true)

        axios({
            url: activeBrand === 'All Brands' ?
                `cars?filters[category][name][$eq]=${activeCategory}&filters[cities][name][$eq]=${activeCity}&filters[sub_categories][name][$eq]=${activeSubCategory}&sort=deposit%3A${activeSort}`
                : `cars?filters[category][name][$eq]=${activeCategory}&filters[cities][name][$eq]=${activeCity}&filters[brand_car][name][$eq]=${activeBrand}&filters[sub_categories][name][$eq]=${activeSubCategory}&sort=deposit%3A${activeSort}`,
            method: 'GET',
            params: {
                populate: '*',
            },
        })
            .then((res) => {
                setResCars(res.data.data);
            })
            .catch((err) => alert(err))
            .finally(() => setLoading(false))
    }, [activeCategory,
        setActiveCategory,
        activeCity,
        setActiveCity,
        activeBrand,
        setActiveBrand,
        activeSubCategory,
        setActiveSubCategory,
        activeSort,
        setActiveSort])

    function openSortModal() {
        setModal(stateModals.sortModal)
    }

    function openBrandCarModal() {
        setModal(stateModals.brandCar)
    }

    function closeModals() {
        setModal(null)
    }

    return (
        <React.Fragment>
            {loading && <Loaders isCentered />}

            <FlatList style={{ marginBottom: 80 }} data={resCars} keyExtractor={({ id }) => id}
                ListHeaderComponent={
                    <Container>
                        <FiltersCars
                            loading={loading}
                            cities={cities}
                            categories={categories}
                            subCategories={subCategories}
                            activeSubCategory={activeSubCategory}
                            activeCity={activeCity}
                            activeCategory={activeCategory}
                            setActiveCity={setActiveCity}
                            setActiveCategory={setActiveCategory}
                            setActiveSubCategory={setActiveSubCategory} />

                        <TouchableOpacity onPress={openBrandCarModal} disabled={loading}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 15,
                                padding: 8,
                                backgroundColor: myColors.gray,
                                borderRadius: 8
                            }}>
                                {!loading ?
                                    <React.Fragment>
                                        <Text style={{ color: Colors.white }}>{activeBrand}</Text>
                                        <Icon type="font-awesome-5" name="car-alt" color={Colors.white} />
                                    </React.Fragment>
                                    : <Skeletons height={30} />}
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text
                                style={{ padding: 8, borderRadius: 8, color: Colors.white, backgroundColor: myColors.dark }}>
                                {resCars.length} {t("Cars")}
                            </Text>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={openSortModal}
                                background={TouchableNativeFeedback.Ripple(myColors.danger, true)}>
                                <Icon type="font-awesome-5" name="sort-amount-up-alt" color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <Modals visible={modal === stateModals.brandCar} onClose={closeModals}>
                            <Text style={{ color: colors.text, fontSize: 18, marginBottom: 20, maxWidth: '90%' }}>{t('Choose Brand Car')}!</Text>
                            <TouchableOpacity onPress={() => { setActiveBrand('All Brands'); closeModals() }} disabled={loading}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingVertical: 8
                                    }}>
                                    <Text style={{ color: colors.text, fontSize: 18 }}>{t("All Brands")}!</Text>
                                    {activeBrand === 'All Brands' &&
                                        <Icon type="font-awesome-5" name="check" color={myColors.danger} />
                                    }
                                </View>
                            </TouchableOpacity>
                            {brand.map(brandItem => (
                                <TouchableOpacity
                                    disabled={loading}
                                    key={brandItem.name}
                                    onPress={() => { setActiveBrand(brandItem.attributes.name); closeModals() }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingVertical: 8
                                        }}>
                                        <Text style={{ color: colors.text, fontSize: 18 }}>{brandItem.attributes.name}</Text>
                                        {activeBrand === brandItem.attributes.name &&
                                            <Icon type="font-awesome-5" name="check" color={myColors.danger} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </Modals>

                        <Modals visible={modal === stateModals.sortModal} onClose={closeModals}>
                            <Text style={{ color: colors.text, fontSize: 18, marginBottom: 20 }}>{t("Choose sort!")}</Text>
                            {sorts.map(sortItem => (
                                <TouchableOpacity
                                    disabled={loading}
                                    key={sortItem.name}
                                    onPress={() => { setActiveSort(sortItem.value); closeModals() }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingVertical: 8
                                        }}>
                                        <Text style={{ color: colors.text, fontSize: 18 }}>{sortItem.name}</Text>
                                        {activeSort === sortItem.value &&
                                            <Icon type="font-awesome-5" name="check" color={myColors.danger} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </Modals>
                    </Container>
                }
                renderItem={({ item }) => (
                    <Container>
                        {!loading &&
                            <TouchableOpacity
                                disabled={loading}
                                background={TouchableNativeFeedback.Ripple(myColors.danger)}
                                onPress={() => navigation.navigate("Reserv", { data: item.attributes, cars: resCars })}>
                                <CarCard {...item.attributes} />
                            </TouchableOpacity>}
                    </Container>
                )} />
        </React.Fragment>
    );
}
