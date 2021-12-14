// import { StatusBar } from 'expo-status-bar';
import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./src/navigation/DrawerNavigator";

const navTheme = DefaultTheme;
navTheme.colors.background = '#000814';

const App = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;