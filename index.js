/**
 * @format
 */
import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App'
import { Provider } from "react-redux"
import { store, persistor } from "./src/redux/store"

import './src/config/i18next'
import './src/config/axios'

class Index extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

registerRootComponent(Index)