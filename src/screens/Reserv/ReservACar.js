import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import { RadioButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import { useFormik } from "formik"
import moment from "moment";

import { useInputDatePicker } from '../../hooks'
import { Input, Select, MyDatePicker, CustomBouncyesCheckboxes, FormRow } from "../../components"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { colors } from "../../constants/constantColor"

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

export default function ReservACar({ carName, startPrice, prices, carPhoto, deposit, fuelDeposit }) {
    const fDate = useInputDatePicker()
    const tDate = useInputDatePicker(true)
    const fTime = useInputDatePicker()
    const tTime = useInputDatePicker()

    const [isCheckedBounces, setIsCheckedBounces] = useState([]) // Selected Services
    const [isDeposit, setisDeposit] = useState('With Deposit')
    const [countDays, setCountDays] = useState(1)
    const [totalPrice, setTotalPrice] = useState(startPrice)

    const formik = useFormik({
        initialValues: {
            city: 'Lviv',
            name: '',
            email: '',
            phone: '',
            comment: ''
        },
        validationSchema,
        onSubmit: (values) => {
            if (fDate.date >= tDate.date) {
                alert("Reservation can't be retroactive");
                return;
            }

            const data = {
                carName,
                carPhoto,
                fromDate: moment(fDate.date).format('YYYY-MM-DD'),
                toDate: moment(tDate.date).format('YYYY-MM-DD'),
                fromTime: moment(fTime.date).format('HH:mm'),
                toTime: moment(tTime.date).format('HH:mm'),
                totalPrice,
                countDays,
                deposit_price: deposit,
                fuel_deposite: fuelDeposit,
                services: isCheckedBounces,
                ...values
            }

            alert("Succsess" + JSON.stringify(data));
        },
    });

    useEffect(() => {
        if (fDate.date >= tDate.date) {
            fDate.setDate(new Date())
            tDate.setDate(new Date(Date.now() + (3600 * 1000 * 24)))
            alert("Reservation can't be retroactive");
        }

        setCountDays(moment(tDate.date).diff(fDate.date, 'days')) // Total Count Days
        priceDepositDays()
        setTotalPrice((prev) => countDays * prev + totalPriceServices)
    }, [fDate, tDate, isDeposit, setTotalPrice, setCountDays])

    const totalPriceServices = isCheckedBounces.reduce(
        (prev, serviceItem) => {
            let max_price = Number(serviceItem.price) * countDays
            if (max_price >= Number(serviceItem.max_price)) {
                max_price = Number(serviceItem.max_price)
            }
            return prev + max_price
        }, 0) // Total Price Services 

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

    // function handleBounceCheckBoxes(event, value) {
    //     console.log(event);
    //     if (event) {
    //         setIsCheckedBounces()
    //     } else {
    //         const index = isCheckedBounces.indexOf(value)
    //         isCheckedBounces.slice(index, 1)
    //         setIsCheckedBounces(isCheckedBounces)
    //     }
    //     let newArray = [...services, event]

    //     if (services.includes(event)) {
    //         newArray = newArray.filter(service => service !== event)
    //     }

    //     setIsCheckedBounces(newArray)
    // }

    return (
        <ScrollView style={styles.contentForm}>
            <Text style={styles.title}>Налаштування бронювання</Text>
            <View style={styles.form}>
                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>Date of filing</Text>
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
                        <Text style={styles.label}>Date of filing</Text>
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
                        <Text style={styles.label}>Time of filing</Text>
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
                        <Text style={styles.label}>Time of filing</Text>
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
                        selectedValue={formik.values.city}
                        onChange={formik.handleChange('city')}
                        label="Place of filing" />
                    <Select
                        selectedValue={formik.values.city}
                        onChange={formik.handleChange('city')}
                        label="Place of return"
                        enabled={false} />
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
                            Without Deposit
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <RadioButton
                            testID="With Deposit"
                            value="With Deposit"
                            status={isDeposit === 'With Deposit' ? 'checked' : 'unchecked'}
                            onPress={() => setisDeposit('With Deposit')} />
                        <Text onPress={() => setisDeposit('With Deposit')} style={styles.label}>With Deposit</Text>
                    </View>
                </View>

                <View style={styles.BouncyCheckboxContent}>
                    <CustomBouncyesCheckboxes
                        setIsService={setIsCheckedBounces}
                    />
                </View>

                <FormRow>
                    <Input
                        value={formik.values.name}
                        onChangeText={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        error={formik.errors.name}
                        placeholder="Your Name" />
                </FormRow>

                <Input
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    error={formik.errors.email}
                    placeholder="Your Email" />

                <FormRow>
                    <Input
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        onBlur={formik.handleBlur('phone')}
                        error={formik.errors.phone}
                        keyboardType="number-pad"
                        placeholder="Your Phone" />
                </FormRow>

                <Input
                    multiline
                    value={formik.values.comment}
                    onChangeText={formik.handleChange('comment')}
                    onBlur={formik.handleBlur('comment')}
                    keyboardType="default"
                    placeholder="Comment" />

                <View style={styles.buttonSubmit}>
                    <Text style={styles.title}>Total Price - {totalPrice}Є</Text>
                    <View style={{ width: 120 }}>
                        <Button testID="submit" onPress={formik.handleSubmit} title="Submit" />
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
        justifyContent: 'flex-start',
        marginTop: 10
    },
    datePickerTextInput: {
        padding: 12,
        width: 150,
        color: Colors.white,
        backgroundColor: colors.dark,
        borderWidth: 0,
        borderRadius: 8,
    },
    buttonSubmit: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingBottom: 8,
        width: '100%',
    }
})