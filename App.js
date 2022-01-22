import React, { useEffect, useState } from "react"
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  NavigationContainer
} from "@react-navigation/native"
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { dataOperations } from "./src/redux/data"
import DrawerNavigator from "./src/navigation/DrawerNavigator"
import { ThemeContext } from "./src/context/contentextTheme"

const CustomDarkTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    danger: "rgb(183, 48, 48)",
  }
}

const CustomDefaultTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#000000',
    text: '#ffffff',
    danger: "rgb(183, 48, 48)",
  }
}

const App = () => {
  const { i18n } = useTranslation()

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const dispatch = useDispatch()

  const theme = isDarkTheme ? CustomDefaultTheme : CustomDarkTheme

  const setTheme = async (theme) => {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.log('error', error);
    };
  };

  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      return theme;
    } catch (error) {
      console.log('error', error);
    };
  };

  const themeContext = React.useMemo(() => ({
    toggleTheme: async (value) => {
      if (value) {
        setIsDarkTheme(true);
        setTheme('light');
      } else {
        setIsDarkTheme(false);
        setTheme('dark');
      };
    }
  }), []);

  useEffect(() => {
    getTheme()
      .then(res => {
        setIsDarkTheme(res === 'light');
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);

  useEffect(async () => {
    try {
      const persistedLanguage = await AsyncStorage.getItem('locale')
      if (!persistedLanguage) return

      i18n.changeLanguage(persistedLanguage)
    }
    catch (error) {
      console.log(error)
    }
  }, [i18n])

  useEffect(() => {
    dispatch(dataOperations.citiesFetchAll(i18n))
    dispatch(dataOperations.addtionalServicesFetchAll(i18n))
    dispatch(dataOperations.categoriesFetchAll(i18n))
    dispatch(dataOperations.subCategoriesFetchAll(i18n))
    dispatch(dataOperations.brandFetchAll(i18n))
  }, [i18n.language])

  return (
    <ThemeContext.Provider value={themeContext}>
      <NavigationContainer theme={theme}>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;