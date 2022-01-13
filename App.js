import React from "react"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./src/redux/store"

import DrawerNavigator from "./src/navigation/DrawerNavigator"

import './src/config/axios'

const navTheme = DefaultTheme
navTheme.colors.background = '#000000'

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer theme={navTheme}>
        <DrawerNavigator />
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;