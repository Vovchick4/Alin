import * as Yup from "yup";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useFormik } from "formik"
import moment from "moment-timezone";

import { useInputDatePicker } from '../../hooks'
import { Input, Select, MyDatePicker, CustomBouncyesCheckboxes, FormRow, Loaders } from "../../components"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { myColors } from "../../constants/constantColor"
import { Platform } from "react-native";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required('Name is required'),
    email: Yup.string()
        .trim()
        .email('Email must be a valid email')
        .required('Email is required'),
    phone: Yup.string().required('Phone is required'),
});

export default function ReservACar(
    {
        onSubmit,
        loading,
        cities,
        additionalServices,
        carName,
        prices,
        carPhoto,
        deposit,
        fuelDeposit
    }
) {
    const { t } = useTranslation()

    const fDate = useInputDatePicker()
    const tDate = useInputDatePicker(true)
    const fTime = useInputDatePicker()
    const tTime = useInputDatePicker()

    const [isCheckedBounces, setIsCheckedBounces] = useState([]) // Selected Services
    const [isDeposit, setisDeposit] = useState('With Deposit')
    const [notWorkingTime, setNotWorkingTime] = useState('')
    const [countDays, setCountDays] = useState(1)
    const [totalPrice, setTotalPrice] = useState(prices[0].money)

    const formik = useFormik({
        initialValues: {
            locationFrom: 'Lviv',
            locationTo: "Lviv",
            name: '',
            email: '',
            phone: '',
            comment: ''
        },
        validationSchema,
        onSubmit: (values) => {
            if (fDate.date >= tDate.date) {
                alert(t("Reservation can't be retroactive"));
                return;
            }

            const data = {
                selectedCar: carName,
                image: carPhoto,
                receiveDate: moment(fDate.date).format('YYYY-MM-DD'),
                returnDate: moment(tDate.date).format('YYYY-MM-DD'),
                receiveTime: moment(fTime.date).format('HH:mm:ss.SSS'),
                returnTime: moment(tTime.date).format('HH:mm:ss.SSS'),
                price: totalPrice,
                countDays,
                deposit_price: deposit,
                fuel_deposite: fuelDeposit,
                services: isCheckedBounces.map(item => item.name + " " + item.price),
                ...values
            }

            onSubmit(data)
        },
    });

    useEffect(() => {
        if (fDate.date >= tDate.date) {
            fDate.setDate(new Date())
            tDate.setDate(new Date(Date.now() + (3600 * 1000 * 24)))
            alert(t("Reservation can't be retroactive"));
        }

        // Notes
        // console.log(moment(fTime.date, "Kiev/Ukraine").format('HH:mm') >= '21:00')

        // console.log(fTime.date)
        // console.log(moment('2022-01-21T08:00:00.852Z').format('HH:mm'))
        // console.log(moment.tz(fTime.date, "Europe/Kiev").format('HH:mm'))
        // console.log(moment(fTime.date).format('HH:mm') <= "08:00")

        setCountDays(moment(tDate.date).diff(fDate.date, 'days')) // Total Count Days
        priceDepositDays()
        setTotalPrice((prev) => countDays * prev + totalPriceServices)

        if (fTime.date < tTime.date) {
            setCountDays(prev => prev + 1)
        }

        // Not Working Time + 1 day
        if (moment(fTime.date).format('HH:mm') >= '21:00' ||
            moment(fTime.date).format('HH:mm') <= "08:00" ||
            moment(tTime.date).format('HH:mm') >= '21:00' ||
            moment(tTime.date).format('HH:mm') <= "08:00" ||
            getWeeksDay(fDate.date) == 'ВС' ||
            getWeeksDay(tDate.date) == 'ВС') {
            setTotalPrice(prev => prev + 10)
            setNotWorkingTime(t("Not Working Time"))
        } else {
            setNotWorkingTime('')
        }

        // If location not equals
        if (formik.values.locationFrom !== formik.values.locationTo) {
            setTotalPrice(prev => prev + 100)
            const findCity = cities.find(city => city.title === formik.values.locationTo)
            if (findCity) {
                if (findCity.only_return == 1) {
                    setTotalPrice(prev => prev + 120)
                }
            }
        }
    }, [
        fDate,
        tDate,
        tTime,
        fTime,
        isDeposit,
        setTotalPrice,
        setCountDays,
        formik.values.locationFrom,
        formik.values.locationTo
    ])

    // Total Price Services 
    const totalPriceServices = isCheckedBounces.reduce(
        (prev, serviceItem) => {
            let max_price = Number(serviceItem.price) * countDays
            if (max_price >= Number(serviceItem.max_price)) {
                max_price = Number(serviceItem.max_price)
            }
            return prev + max_price
        }, 0)

    function priceDepositDays() { // завдаток взалежності від кількості днів  
        if (countDays <= 2) {
            if (isDeposit === 'With Deposit') {
                setTotalPrice(prices[4].money)
            } else {
                setTotalPrice(prices[4].money + Number(prices[4].money_deposit))
            }
        } else if (countDays >= 3 && countDays <= 7) {
            if (isDeposit === 'With Deposit') {
                setTotalPrice(prices[3].money)
            } else {
                setTotalPrice(prices[3].money + Number(prices[3].money_deposit))
            }
        } else if (countDays >= 8 && countDays <= 29) {
            if (isDeposit === 'With Deposit') {
                setTotalPrice(prices[2].money)
            } else {
                setTotalPrice(prices[2].money + Number(prices[2].money_deposit))
            }
        } else {
            if (isDeposit === 'With Deposit') {
                setTotalPrice(prices[1].money)
            } else {
                setTotalPrice(prices[1].money + Number(prices[1].money_deposit))
            }
        }
    }

    function getWeeksDay(date) { // метод провіряє який сьогодні день тижня потрібний для провірки нероблчого дня (Неділя)
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        let d = new Date(date);
        return days[d.getDay()];
    }



    return (
        <ScrollView style={styles.contentForm}>
            <Text style={styles.title}>{t('Rent Settings')}</Text>
            <View style={styles.form}>
                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>{t('Date of filing')}</Text>
                        <MyDatePicker
                            testID="fromDate"
                            style={styles.datePickerTextInput}
                            visible={fDate.show}
                            show={fDate.showDatePicker}
                            minimumDate={new Date()}
                            value={fDate.date}
                            onChange={fDate.onChange} />
                    </View>
                    <View>
                        <Text style={styles.label}>{t('Date of return')}</Text>
                        <MyDatePicker
                            testID="toDate"
                            style={styles.datePickerTextInput}
                            visible={tDate.show}
                            show={tDate.showDatePicker}
                            minimumDate={new Date(Date.now() + (3600 * 1000 * 24))}
                            value={tDate.date}
                            onChange={tDate.onChange} />
                    </View>
                </View>

                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>{t('Time of filing')}</Text>
                        <MyDatePicker
                            testID="fromTime"
                            style={styles.datePickerTextInput}
                            mode="time"
                            visible={fTime.show}
                            show={fTime.showDatePicker}
                            minimumDate={new Date()}
                            value={fTime.date}
                            onChange={fTime.onChange} />
                    </View>
                    <View>
                        <Text style={styles.label}>{t('Time of return')}</Text>
                        <MyDatePicker
                            testID="toTime"
                            style={styles.datePickerTextInput}
                            mode="time"
                            visible={tTime.show}
                            show={tTime.showDatePicker}
                            minimumDate={new Date()}
                            value={tTime.date}
                            onChange={tTime.onChange} />
                    </View>
                </View>

                <View style={styles.flexRow}>
                    <Select
                        data={cities}
                        selectedValue={formik.values.locationFrom}
                        onChange={(itemValue) => formik.setFieldValue("locationFrom", itemValue)}
                        label={t("Place of filing")} />
                    <Select
                        isOnlyReturn
                        data={cities}
                        selectedValue={formik.values.locationTo}
                        onChange={(itemValue) => formik.setFieldValue("locationTo", itemValue)}
                        label={t("Place of return")}
                    />
                </View>

                <View style={styles.flexRowAraund}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <RadioButton
                            testID="Without Deposit"
                            value="Without Deposit"
                            status={isDeposit === 'Without Deposit' ? 'checked' : 'unchecked'}
                            disabled={countDays <= 2}
                            onPress={() => setisDeposit('Without Deposit')} />
                        <Text onPress={() => {
                            if (countDays >= 3) {
                                setisDeposit('Without Deposit')
                            }
                        }}
                            style={styles.label}>
                            {t('Without Deposit')}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <RadioButton
                            testID="With Deposit"
                            value="With Deposit"
                            status={isDeposit === 'With Deposit' ? 'checked' : 'unchecked'}
                            onPress={() => setisDeposit('With Deposit')} />
                        <Text onPress={() => setisDeposit('With Deposit')} style={styles.label}>
                            {t('With Deposit')}
                        </Text>
                    </View>
                </View>

                <View style={styles.BouncyCheckboxContent}>
                    <CustomBouncyesCheckboxes
                        additionalServices={additionalServices}
                        setIsService={setIsCheckedBounces}
                    />
                </View>

                <FormRow>
                    <Input
                        value={formik.values.name}
                        onChangeText={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        error={t(formik.errors.name)}
                        placeholder={t("Your Name")} />
                </FormRow>

                <Input
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    error={t(formik.errors.email)}
                    placeholder={t("Your Email")} />

                <FormRow>
                    <Input
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        onBlur={formik.handleBlur('phone')}
                        error={t(formik.errors.phone)}
                        keyboardType="number-pad"
                        placeholder={t("Your Phone")} />
                </FormRow>

                <Input
                    multiline
                    value={formik.values.comment}
                    onChangeText={formik.handleChange('comment')}
                    onBlur={formik.handleBlur('comment')}
                    keyboardType="default"
                    placeholder={t("Comment")} />

                <Text style={notWorkingTime && styles.label}>
                    {notWorkingTime && `${notWorkingTime} + 10€`}
                </Text>

                <Text style={styles.label}>
                    {t("Number of days:")} {countDays}
                </Text>

                <View style={styles.buttonSubmit}>
                    <Text style={[styles.title, { lineHeight: 40 }]}>{t('Total Price')} - {totalPrice}€</Text>
                    <View style={Platform.OS === 'ios' ? { width: 120, backgroundColor: myColors.danger } : { width: 120 }}>
                        <Button testID="submit" onPress={formik.handleSubmit} title={t("Submit")} color={myColors.gray} disabled={loading} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    contentForm: {
        padding: 20,
    },
    title: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 20,
        fontWeight: '700'
    },
    label: {
        color: Colors.white,
        fontSize: 16,
        marginVertical: 8,
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flexRowAraund: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8
    },
    BouncyCheckboxContent: {
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingLeft: 3,
        marginBottom: 15
    },
    datePickerTextInput: {
        padding: 12,
        width: 150,
        color: Colors.white,
        backgroundColor: myColors.gray,
        borderWidth: 0,
        borderRadius: 8,
    },
    buttonSubmit: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        paddingBottom: 8,
        width: '100%',
    }
})