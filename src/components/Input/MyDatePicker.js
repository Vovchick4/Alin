import React from "react"
import { View, Text } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export default function MyDatePicker({ visible, show, testID, mode, value, minimumDate, style, onChange, ...props }) {
    return (
        <React.Fragment>
            <Text onPress={show} style={style}>
                {mode === 'time' ? moment(value).format('HH:mm') : moment(value).format('YYYY-MM-DD')}
            </Text>
            {visible && (
                <DateTimePicker
                    testID={testID}
                    value={value}
                    mode={mode}
                    minimumDate={minimumDate}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    {...props}
                />
            )}
        </React.Fragment>
    )
}
