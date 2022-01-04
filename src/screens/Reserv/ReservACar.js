import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, Picker, Button } from "react-native"
import * as Yup from "yup";
import { useFormik } from "formik"
import DatePicker from "react-native-datepicker"

import { Input, Select, FormRow } from "../../components"
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

export default function ReservACar() {
    // const [selectedValue, setSelectedValue] = useState("java");
    // const [date, setDate] = useState(new Date())
    const formik = useFormik({
        initialValues: {
            fromDate: new Date(),
            toDate: new Date(Date.now() + (3600 * 1000 * 24)),// today 1 Day add
            fromTime: new Date(),
            toTime: new Date(),
            city: 'Lviv',
            name: '',
            email: '',
            phone: '',
            comment: ''
        },
        validationSchema,
        onSubmit: (values) => {
            alert("Succsess" + JSON.stringify(values));
        },
    });

    useEffect(() => {
        if (formik.values.toDate <= formik.values.fromDate) {
            formik.values.toDate = new Date(Date.now() + (3600 * 1000 * 24))
            formik.values.fromDate = new Date()
            alert("Reservation can't be retroactive");
        }
    }, [formik])

    return (
        <View style={styles.contentForm}>
            <Text style={styles.title}>Налаштування бронювання</Text>
            <View style={styles.form}>
                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>Date of filing</Text>
                        <DatePicker
                            style={styles.datePickerTextInput}
                            customStyles={{
                                dateText: {
                                    color: Colors.white
                                },
                                dateInput: {
                                    borderWidth: 0,
                                }
                            }}
                            minDate={new Date()}
                            date={formik.values.fromDate}
                            onDateChange={formik.handleChange('fromDate')} />
                    </View>
                    <View>
                        <Text style={styles.label}>Date of return</Text>
                        <DatePicker
                            style={styles.datePickerTextInput}
                            customStyles={{
                                dateText: {
                                    color: Colors.white
                                },
                                dateInput: {
                                    borderWidth: 0,
                                }
                            }}
                            minDate={new Date(Date.now() + (3600 * 1000 * 24))}
                            date={formik.values.toDate}
                            onDateChange={formik.handleChange('toDate')} />
                    </View>
                </View>

                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.label}>Time of filing</Text>
                        <DatePicker
                            style={styles.datePickerTextInput}
                            customStyles={{
                                dateText: {
                                    color: Colors.white
                                },
                                dateInput: {
                                    borderWidth: 0,
                                }
                            }}
                            mode="time"
                            format="HH:mm"
                            date={formik.values.fromTime}
                            onDateChange={formik.handleChange('fromTime')} />
                    </View>
                    <View>
                        <Text style={styles.label}>Time of return</Text>
                        <DatePicker
                            style={styles.datePickerTextInput}
                            customStyles={{
                                dateText: {
                                    color: Colors.white
                                },
                                dateInput: {
                                    borderWidth: 0,
                                }
                            }}
                            mode="time"
                            format="HH:mm"
                            date={formik.values.toTime}
                            onDateChange={formik.handleChange('toTime')} />
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

                <View style={styles.buttonSubmit}>
                    <Button onPress={formik.handleSubmit} title="Submit" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    contentForm: {
        padding: 20
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
    datePickerTextInput: {
        width: 150,
        color: Colors.white,
        backgroundColor: colors.dark,
        borderWidth: 0
    },
    buttonSubmit: {
        marginTop: 8,
        width: 100,
    }
})