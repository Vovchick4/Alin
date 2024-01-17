import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { useTranslation } from 'react-i18next'

import { AboutStackNavigator, NavigatorsStackNavigator, SettingsNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator";

import { DrawerContent } from "../components";
import { myColors } from "../constants/constantColor";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const { t } = useTranslation()

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{
            headerShown: false,
            drawerActiveTintColor: 'white',
            drawerActiveBackgroundColor: myColors.danger,
        }}>
            <Drawer.Screen name="Tabs" component={BottomTabNavigator} options={{
                drawerLabel: t('Home'),
                drawerLabelStyle: { marginLeft: -10, fontSize: 16 },
                drawerIcon: ({ color, size }) =>
                    <Icon name='ios-home'
                        type='ionicon'
                        color={color}
                        size={size}
                    />,
            }} />
            <Drawer.Screen name="Navigators Drawer" component={NavigatorsStackNavigator} options={{
                drawerLabel: t('Navigators'),
                drawerLabelStyle: { marginLeft: -10, fontSize: 16 },
                drawerIcon: ({ color, size }) =>
                    <Icon name='navigate-circle-sharp'
                        type='ionicon'
                        color={color}
                        size={size}
                    />,
            }} />
            <Drawer.Screen name="About Drawer" component={AboutStackNavigator} options={{
                drawerLabel: t('Contacts'),
                drawerLabelStyle: { marginLeft: -11, fontSize: 16 },
                drawerIcon: ({ color, size }) =>
                    <Icon name='id-card'
                        type='font-awesome-5'
                        color={color}
                        size={size}
                    />,
            }} />
            <Drawer.Screen name="Settings Drawer" component={SettingsNavigator} options={{
                drawerLabel: t('Settings'),
                drawerLabelStyle: { marginLeft: -14, fontSize: 16 },
                drawerIcon: ({ color, size }) =>
                    <Icon name='cogs'
                        type='font-awesome-5'
                        color={color}
                        size={size}
                    />,
            }} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;