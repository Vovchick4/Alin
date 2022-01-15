import { createReducer, combineReducers } from '@reduxjs/toolkit'

import { themeActions as actions } from './'

export const theme = createReducer('dark', {
    [actions.changeTheme]: (_, { payload }) => payload === 'dark' ? 'dark' : 'light',
});

export default combineReducers({ theme })