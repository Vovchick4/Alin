import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import { useFormik } from "formik"
import moment from "moment";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

const services = [
    { id: '2', name: 'Additional driver / 10€', price: '10', max_price: '10', sort_order: '1' },
    { id: '3', name: 'GPS Navigator / 5€ day', price: '5', max_price: '40', sort_order: '2' },
    { id: '4', name: 'Baby seat / 5€ day', price: '5', max_price: '40', sort_order: '3' },
    { id: '5', name: 'Electric Scooter / 10€ day', price: '10', max_price: '200', sort_order: '4' },
    { id: '6', name: 'Wi-Fi in the car / 3€ day', price: '3', max_price: '39', sort_order: '5' }
]

export default function ReservACar() {
    const fDate = useInputDatePicker()
    const tDate = useInputDatePicker(true)
    const fTime = useInputDatePicker()
    const tTime = useInputDatePicker()

    const [isCheckedBounces, setIsCheckedBounces] = useState([])
    console.log(isCheckedBounces);

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
                fromDate: moment(fDate.date).format('YYYY-MM-DD'),
                toDate: moment(tDate.date).format('YYYY-MM-DD'),
                fromTime: moment(fTime.date).format('HH:mm'),
                toTime: moment(tTime.date).format('HH:mm'),
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

    }, [fDate, tDate])

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

                <View style={styles.BouncyCheckboxContent}>
                    {services.map((item) => (
                        <CustomBouncyesCheckboxes
                            key={item.id}
                            text={item.name}
                        />
                    ))}
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

                    <View style={styles.buttonSubmit}>
                        <Button onPress={formik.handleSubmit} title="Submit" />
                    </View>
                </FormRow>
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
        marginVertical: 20,
        width: 100,
    }
})