import React from "react";
import { View, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Emergency, Rent, Reserv, Loyalty, MoreInfo, About, Navigators, Settings, Language, Theme, AskQuestion, Faq, PrivacyPolicy, AboutAlin, ProgramLoality } from '../screens';
import { DrawerActions, useNavigation } from "@react-navigation/native";

import { myColors } from "../constants/constantColor";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: myColors.danger,
    },
    headerTintColor: "white",
    headerBackTitle: "Black",
};

// const config = {
//     animation: 'timing',
//     config: {
//         stiffness: 1000,
//         damping: 5000,
//         mass: 3,
//         overshootClamping: true,
//         restDisplacementThreshold: 1.01,
//         restSpeedThreshold: 1.01,
//     },
// };

function LogoTitle() {
    const navigation = useNavigation();

    return (
        // <View style={{ padding: 5, borderRadius: 15, overflow: 'hidden', width: 48, height: 48 }}>
        <TouchableNativeFeedback
            style={{
                width: 34,
                height: 34,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 100,
                backgroundColor: myColors.danger,
            }}
            background={TouchableNativeFeedback.Ripple(myColors.dark, true)}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
                style={{ width: 25, height: 25, tintColor: 'white' }}
                source={require('../images/hamb.png')}
            />
        </TouchableNativeFeedback>
        // </View>
    );
}

const MainStackNavigator = () => {
    const { t } = useTranslation()

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Emergency" component={Emergency} options={{
                title: t("Emergency Calls"),
                headerLeft: () => <LogoTitle />
            }} />
        </Stack.Navigator>
    );
}

const LoyaltyStackNavigator = () => {
    const { t } = useTranslation()

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Loyalty" component={Loyalty} options={{ title: t('Loyalty'), headerLeft: () => <LogoTitle /> }} />
            <Stack.Screen name="MoreInfo" component={MoreInfo} options={({ route }) => (
                { title: route.params.data.title }
            )} />
        </Stack.Navigator>
    );
}

const RentStackNavigator = () => {
    const { t } = useTranslation()

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Rent" component={Rent} options={{
                // transitionSpec: { open: config, close: config },
                title: t('Rent'),
                headerLeft: () => <LogoTitle />
            }} />
            <Stack.Screen name="Reserv" component={Reserv} options={() => (
                {
                    // transitionSpec: { open: config, close: config }, 
                    title: "", headerTitleStyle: { fontSize: 18 }, headerTitleAlign: 'left',
                }
            )} />
        </Stack.Navigator>
    );
}

const NavigatorsStackNavigator = () => {
    const { t } = useTranslation()

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Navigators" component={Navigators} options={{ title: t('Navigators'), headerLeft: () => <LogoTitle /> }} />
        </Stack.Navigator>
    );
}

const AboutStackNavigator = () => {
    const { t } = useTranslation()

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="About" component={About} options={{ title: t('Contacts'), headerLeft: () => <LogoTitle /> }} />
        </Stack.Navigator>
    );
}

const SettingsNavigator = () => {
    const { t } = useTranslation()

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Settings" component={Settings} options={{ title: t("Settings"), headerLeft: () => <LogoTitle /> }} />
            <Stack.Screen name="Language" component={Language} options={{ title: t("Language") }} />
            <Stack.Screen name="Theme" component={Theme} options={{ title: t("Theme") }} />
            <Stack.Screen name="AskQuestion" component={AskQuestion} options={{ title: t("Ask A Question") }} />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen name="AboutAlin" component={AboutAlin} options={{ title: t("About Alin") }} />
            <Stack.Screen name="ProgramLoality" component={ProgramLoality} options={{ title: t("Loyalty Program Info"), headerTitleStyle: { fontSize: 18 }, headerTitleAlign: 'left', }} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: t("Privacy Policy"), headerTitleStyle: { fontSize: 18 }, headerTitleAlign: 'left', }} />
        </Stack.Navigator>
    );
}

export {
    MainStackNavigator,
    LoyaltyStackNavigator,
    RentStackNavigator,
    SettingsNavigator,
    NavigatorsStackNavigator,
    AboutStackNavigator
};