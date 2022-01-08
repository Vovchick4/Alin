import React from "react";
import { Image, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Emergency, Rent, Reserv, Loyalty, About, Navigators } from '../screens';
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { colors } from "../constants/constantColor";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: colors.danger,
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

function LogoTitle() {
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.dark)} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
                style={{ width: 25, height: 25, tintColor: 'white' }}
                source={require('../images/hamb.png')}
            />
        </TouchableNativeFeedback>
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