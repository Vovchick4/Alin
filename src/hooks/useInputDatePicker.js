import React, { useState } from "react"

export function useInputDatePicker(isNextDay = false) {
    const [date, setDate] = useState(!isNextDay ? new Date() : new Date(Date.now() + (3600 * 1000 * 24)));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    return {
        date,
        setDate,
        showDatePicker,
        show,
        mode,
        onChange
    }
}