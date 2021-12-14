import React from "react";
import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { MainStackNavigator, LoyaltyStackNavigator, RentStackNavigator } from "./StackNavigator";
import { TabButton } from '../components';

const Tab = createBottomTabNavigator();

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 5000,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.11,
        restSpeedThreshold: 0.21,
    },
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'left',
            tabBarStyle: { margin: 15, paddingBottom: 2, borderRadius: 10, backgroundColor: 'rgb(220, 38, 38)' },
            // tabBarActiveBackgroundColor: 'gray',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
        }}>
            <Tab.Screen name="Emargency Tab" component={MainStackNavigator} options={{
                tabBarLabel: 'Emargency',
                tabBarIcon: (props) => <TabButton typeIcon="font-awesome-5" icon="phone-square-alt" {...props} />,
                // tabBarVisibilityAnimationConfig: {
                //     open: config,
                //     close: config,
                // },
            }} />
            <Tab.Screen name="Rent Tab" component={RentStackNavigator} options={{
                tabBarLabel: 'Rent a car',
                tabBarIcon: (props) => <TabButton typeIcon="ionicon" icon="ios-car" {...props} />,
            }} />
            <Tab.Screen name="Loyalty Tab" component={LoyaltyStackNavigator} options={{
                tabBarLabel: 'Loyalty',
                tabBarIcon: (props) => <TabButton typeIcon="ionicon" icon="ios-card" {...props} />,
            }} />
        </Tab.Navigator >
    );
};

export default BottomTabNavigator;