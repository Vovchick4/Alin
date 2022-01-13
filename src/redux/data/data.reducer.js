import { createReducer, combineReducers } from '@reduxjs/toolkit'

import { dataActions as actions } from './'

export const cities = createReducer([], {
    [actions.citiesAllSuccess]: (_, { payload }) => payload,
});

export const additionalServices = createReducer([], {
    [actions.additionalServicesAllSuccess]: (_, { payload }) => payload,
});

export const categories = createReducer([], {
    [actions.categoriesAllSuccess]: (_, { payload }) => payload,
});

export const subCategoires = createReducer([], {
    [actions.subCategoriesAllSuccess]: (_, { payload }) => payload,
});

export const loading = createReducer(false, {
    [actions.citiesAllRequest]: () => true,
    [actions.citiesAllSuccess]: () => false,
    [actions.citiesAllError]: () => false,

    [actions.additionalServicesAllRequest]: () => true,
    [actions.additionalServicesAllSuccess]: () => false,
    [actions.additionalServicesAllError]: () => false,

    [actions.categoriesAllRequest]: () => true,
    [actions.categoriesAllSuccess]: () => false,
    [actions.categoriesAllError]: () => false,

    [actions.subCategoriesAllRequest]: () => true,
    [actions.subCategoriesAllSuccess]: () => false,
    [actions.subCategoriesAllError]: () => false,
});

export default combineReducers({ cities, additionalServices, categories, subCategoires, loading })