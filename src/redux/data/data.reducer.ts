import { createReducer, combineReducers, PayloadAction } from '@reduxjs/toolkit'

import { dataActions as actions } from '.'

export const cities = createReducer([], {
    [(actions.citiesAllSuccess as any)]: (_, { payload }: PayloadAction<any>) => payload,
});

export const additionalServices = createReducer([], {
    [actions.additionalServicesAllSuccess as any]: (_, { payload }: PayloadAction<any>) => payload,
});

export const categories = createReducer([], {
    [actions.categoriesAllSuccess as any]: (_, { payload }: PayloadAction<any>) => payload,
});

export const subCategoires = createReducer([], {
    [actions.subCategoriesAllSuccess as any]: (_, { payload }: PayloadAction<any>) => payload,
});

export const brand = createReducer([], {
    [actions.brandAllSuccess as any]: (_, { payload }: PayloadAction<any>) => payload,
});

export const loading = createReducer(false, {
    [actions.citiesAllRequest as any]: () => true,
    [actions.citiesAllSuccess as any]: () => false,
    [actions.citiesAllError as any]: () => false,

    [actions.additionalServicesAllRequest as any]: () => true,
    [actions.additionalServicesAllSuccess as any]: () => false,
    [actions.additionalServicesAllError as any]: () => false,

    [actions.categoriesAllRequest as any]: () => true,
    [actions.categoriesAllSuccess as any]: () => false,
    [actions.categoriesAllError as any]: () => false,

    [actions.subCategoriesAllRequest as any]: () => true,
    [actions.subCategoriesAllSuccess as any]: () => false,
    [actions.subCategoriesAllError as any]: () => false,

    [actions.brandAllRequest as any]: () => true,
    [actions.brandAllSuccess as any]: () => false,
    [actions.brandAllError as any]: () => false,
});

export default combineReducers({ cities, additionalServices, categories, subCategoires, brand, loading })