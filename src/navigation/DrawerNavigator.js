import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";

import { AboutStackNavigator, NavigatorsStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator";
import { DrawerContent } from "../components";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{
            headerShown: false,
            drawerActiveTintColor: 'white',
            drawerActiveBackgroundColor: 'rgb(220, 38, 38)',
        }}>
            <Drawer.Screen name="Tabs" component={BottomTabNavigator} options={{
                drawerLabel: 'Home',
                drawerIcon: ({ color }) =>
                    <Icon name='ios-home'
                        type='ionicon'
                        color={color}
                    />,
            }} />
            <Drawer.Screen name="Navigators Drawer" component={NavigatorsStackNavigator} options={{
                drawerLabel: 'Navigators',
                drawerIcon: ({ color }) =>
                    <Icon name='navigate-circle-sharp'
                        type='ionicon'
                        color={color}
                    />,
            }} />
            <Drawer.Screen name="About Drawer" component={AboutStackNavigator} options={{
                drawerLabel: 'About',
                drawerIcon: ({ color }) =>
                    <Icon name='id-card'
                        type='font-awesome-5'
                        color={color}
                    />,
            }} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;