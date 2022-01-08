// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer, useNavigation } from "@react-navigation/native";

import DrawerNavigator from "./src/navigation/DrawerNavigator";

const navTheme = DefaultTheme;
navTheme.colors.background = '#000000';

const App = () => {

  useEffect(() => {
  }, [])

  return (
    <NavigationContainer theme={navTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;