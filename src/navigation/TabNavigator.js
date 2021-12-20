import React, { useRef } from "react";
import 'react-native-gesture-handler'
import { Animated, Easing, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, LoyaltyStackNavigator, RentStackNavigator } from "./StackNavigator";
import { TabButton } from '../components';

const Tab = createBottomTabNavigator();

const openConfig = {
    animation: 'spring',
    config: {
        duration: 434,
        easing: Easing.linear
    },
};

const closeConfig = {
    animation: 'spring',
    config: {
        duration: 434,
        easing: Easing.linear
    },
};

function getWidth() {
    let width = Dimensions.get("window").width

    // Horizontal Padding = 20...
    width = width - 80

    // Total five Tabs...
    return width / 3
}

const BottomTabNavigator = () => {
    // Animated Tab Indicator...
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        <React.Fragment>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 40,
                    marginHorizontal: 20,
                    height: 60,
                    borderRadius: 10,
                    shadowColor: '#ffff',
                    shadowOpacity: 0.83,
                    shadowOffset: {
                        width: 4,
                        height: 4,
                    },
                    paddingHorizontal: 20,
                    backgroundColor: 'rgb(220, 38, 38)'
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
            }}>
                <Tab.Screen name="Emargency Tab" component={MainStackNavigator} options={{
                    tabBarIcon: (props) => <TabButton typeIcon="font-awesome-5" icon="phone-square-alt" {...props} />
                }}
                    listeners={({ navigation, route }) => ({
                        // Onpress Update....
                        tabPress: () => {
                            Animated.spring(tabOffsetValue, {
                                toValue: 0,
                                useNativeDriver: true
                            }).start();
                        }
                    })} />
                <Tab.Screen name="Rent Tab" component={RentStackNavigator} options={{
                    tabBarIcon: (props) => <TabButton typeIcon="ionicon" icon="ios-car" {...props} />,
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: () => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true
                        }).start();
                    }
                })} />
                <Tab.Screen name="Loyalty Tab" component={LoyaltyStackNavigator} options={{
                    tabBarIcon: (props) => <TabButton typeIcon="ionicon" icon="ios-card" {...props} />,
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: () => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 2,
                            useNativeDriver: true
                        }).start();
                    }
                })} />
            </Tab.Navigator>

            <Animated.View style={{
                width: getWidth() - 20,
                height: 2,
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 100,
                // Horizontal Padding = 20...
                left: 50,
                borderRadius: 20,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}></Animated.View>
        </React.Fragment>
    );
};

export default BottomTabNavigator;