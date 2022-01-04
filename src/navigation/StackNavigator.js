import React from "react";
import { TouchableWithoutFeedback, Image, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Emergency, Rent, Reserv, Loyalty, About, Navigators } from '../screens';
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: "rgb(220, 38, 38)",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

function LogoTitle() {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
                style={{ width: 25, height: 25, marginRight: 15 }}
                source={require('../images/hamb.png')}
            />
        </TouchableWithoutFeedback>
    );
}

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Emergency" component={Emergency} options={{
                headerLeft: () => <LogoTitle />
            }} />
        </Stack.Navigator>
    );
}

const LoyaltyStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Loyalty" component={Loyalty} options={{ headerLeft: () => <LogoTitle /> }} />
        </Stack.Navigator>
    );
}

const RentStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Rent" component={Rent} options={{ headerLeft: () => <LogoTitle /> }} />
            <Stack.Screen name="Reserv" component={Reserv} options={({ route }) => ({ title: '' })} />
        </Stack.Navigator>
    );
}

const NavigatorsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Navigators" component={Navigators} options={{ headerLeft: () => <LogoTitle /> }} />
        </Stack.Navigator>
    );
}

const AboutStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="About" component={About} options={{ headerLeft: () => <LogoTitle /> }} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, LoyaltyStackNavigator, RentStackNavigator, NavigatorsStackNavigator, AboutStackNavigator };