import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
// import { useFormik } from "formik"
// import DatePicker from 'react-native-date-picker'

import { Colors } from "react-native/Libraries/NewAppScreen"
import { colors } from "../../constants/constantColor"

export default function ReservACar() {
    const [date, setDate] = useState(new Date())
    // const formik = useFormik({
    //     initialValues: {
    //         fromDate: new Date(),
    //         toDate: new Date(),
    //         inningsCity: '',
    //         comebackCity: '',
    //         name: '',
    //         email: '',
    //         phone: '',
    //         comment: ''
    //     },
    //     // validationSchema,
    //     onSubmit: (values) => {
    //         alert("Succsess" + JSON.parse(values));
    //     },
    // });

    return (
        <View style={styles.contentForm}>
            <Text style={styles.title}>Налаштування бронювання</Text>

            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="date" keyboardType="number-pad" />
                {/* <DatePicker date={date} onDateChange={setDate} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        color: Colors.white,
        fontSize: 16,
        backgroundColor: colors.dark,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 8,
    },
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
})
