import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, Picker, Button } from "react-native"
import * as Yup from "yup";
import { useFormik } from "formik"
// import DatePicker from 'react-native-date-picker'

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
            // fromDate: new Date(),
            // toDate: new Date(),
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

    return (
        <View style={styles.contentForm}>
            <Text style={styles.title}>Налаштування бронювання</Text>

            <View style={styles.form}>
                {/* <DatePicker date={date} onDateChange={setDate} /> */}

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
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonSubmit: {
        marginTop: 8,
        width: 100,
    }
})