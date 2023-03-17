import React, { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { FlatList, TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler"
import { myColors } from "../../constants/constantColor"
import axios from "axios"
import { Colors } from "react-native/Libraries/NewAppScreen"

import { Container, Loaders, Modals, Skeletons } from '../../components'
import CarCard from "./CarCard"
import FiltersCars from "./FiltersCars";
import ArrowTop from "./ArrowTop";
import { dataSelectors } from '../../redux/data'
import { useTheme } from "@react-navigation/native";
import { isCloseToBottom } from '../../utils'

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
    const { t, i18n } = useTranslation()

    const [resCars, setResCars] = useState([])
    const [loading, setLoading] = useState(false)

    const cities = useSelector(dataSelectors.getCities)
    const categories = useSelector(dataSelectors.getCategoires)
    const subCategories = useSelector(dataSelectors.getSubCategoires)
    const brand = useSelector(dataSelectors.getBrand)
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState(0)
    // const dataLoading = useSelector(dataSelectors.getLoading)

    const [activeCity, setActiveCity] = useState({ id: 1, title: "Lviv" })
    const [activeBrand, setActiveBrand] = useState({ label: 'All Brands', value: 0 })
    const [activeCategory, setActiveCategory] = useState({ label: 'All Categories', value: 0 })
    const [activeSubCategory, setActiveSubCategory] = useState({ id: 1, name: "Gasoline", subcategoryslug: "benzin", })
    const [activeSort, setActiveSort] = useState({ label: 'asc', value: 1 })

    const [modal, setModal] = useState(null)
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
    const CONTENT_OFFSET_THRESHOLD = 300

    const listRef = useRef(null)

    useEffect(() => {
        setLoading(true)
        axios({
            url: `/allcars?category=${activeCategory.value}&subCategory=${activeSubCategory.subcategoryslug}&city=${activeCity.id}&brand=${activeBrand.value}&sort=${activeSort.label}&page=${page}`,
            method: 'GET',
            params: {
                locale: i18n.language,
            },
        })
            .then((res) => {
                setResCars(prev => [...prev, ...res.data.data]);
                setMeta(res.data.meta);
            })
            .catch((err) => alert("Not Found Cars!"))
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
        setActiveSort,
        page,
        setPage])

    function openSortModal() {
        setModal(stateModals.sortModal)
    }

    function openBrandCarModal() {
        setModal(stateModals.brandCar)
    }

    function closeModals() {
        setModal(null)
    }

    function scrollList({ nativeEvent }) {
        setContentVerticalOffset(nativeEvent.contentOffset.y)
    }

    return (
        <React.Fragment>
            {loading && page === 1 && <Loaders isCentered />}

            <ArrowTop offsetY={contentVerticalOffset} offsetContent={CONTENT_OFFSET_THRESHOLD} scrollTopRef={listRef} />

            <FlatList style={{ marginBottom: 80 }} data={resCars} keyExtractor={({ id }) => id}
                ref={listRef}
                onScroll={(e) => scrollList(e)}
                ListHeaderComponent={
                    <Container>
                        <FiltersCars
                            loading={loading}
                            setPage={setPage}
                            setCars={setResCars}
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
                                        <Text style={{ color: Colors.white }}>{activeBrand.label}</Text>
                                        <Icon type="font-awesome-5" name="car-alt" color={Colors.white} />
                                    </React.Fragment>
                                    : <Skeletons height={30} />}
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text
                                style={{ padding: 8, borderRadius: 8, color: Colors.white, backgroundColor: myColors.dark }}>
                                {meta} {t("Cars")}
                            </Text>
                            <TouchableOpacity
                                disabled={loading}
                                onPress={openSortModal}
                                background={TouchableNativeFeedback.Ripple(myColors.danger, true)}>
                                <Icon type="font-awesome-5" name="sort-amount-up-alt" color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <Modals visible={modal === stateModals.brandCar} onClose={closeModals}>
                            <TouchableOpacity
                                onPress={() => {
                                    setActiveBrand({ label: 'All Brands', value: 0 });
                                    setPage(1);
                                    setResCars([]);
                                    closeModals();
                                }}
                                disabled={loading}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingVertical: 8
                                    }}>
                                    <Text style={{ color: colors.text, fontSize: 18 }}>{t("All Brands")}!</Text>
                                    {activeBrand.label === 'All Brands' &&
                                        <Icon type="font-awesome-5" name="check" color={myColors.danger} />
                                    }
                                </View>
                            </TouchableOpacity>
                            {brand.map(brandItem => (
                                <TouchableOpacity
                                    disabled={loading}
                                    key={brandItem.id}
                                    onPress={() => {
                                        setActiveBrand({ label: brandItem.name, value: brandItem.id });
                                        setPage(1);
                                        setResCars([]);
                                        closeModals();
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingVertical: 8
                                        }}>
                                        <Text style={{ color: colors.text, fontSize: 18 }}>{brandItem?.name}</Text>
                                        {activeBrand.label === brandItem?.name &&
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
                                    key={sortItem.id}
                                    onPress={() => {
                                        setActiveSort({ label: sortItem.value, value: sortItem.name });
                                        setPage(1);
                                        setResCars([]);
                                        closeModals();
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingVertical: 8
                                        }}>
                                        <Text style={{ color: colors.text, fontSize: 18 }}>{sortItem.name}</Text>
                                        {activeSort.label === sortItem.value &&
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
                        {Platform.OS === 'android' ? (
                            <TouchableNativeFeedback
                                disabled={loading}
                                background={TouchableNativeFeedback.Ripple(myColors.danger)}
                                onPress={() => navigation.navigate("Reserv", { data: item, cars: resCars })}>
                                <CarCard {...item} />
                            </TouchableNativeFeedback>
                        ) : (
                            <TouchableHighlight
                                disabled={loading}
                                onPress={() => navigation.navigate("Reserv", { data: item, cars: resCars })}>
                                <CarCard {...item} />
                            </TouchableHighlight>
                        )}

                    </Container>
                )}
                // onEndReachedThreshold={0.8}
                onEndReached={({ distanceFromEnd }) => distanceFromEnd === 0 && resCars.length >= 1 && resCars.length !== meta && setPage(prev => prev + 1)}
            />

            {loading && page !== 1 && (
                <Loaders isOverlay isCentered />
            )}
        </React.Fragment>
    );
}
