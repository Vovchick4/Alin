import { createAction } from '@reduxjs/toolkit'

export const citiesAllRequest = createAction('cities/fetchAllRequest');
export const citiesAllSuccess = createAction('cities/fetchAllSuccess');
export const citiesAllError = createAction('cities/fetchAllError');

export const additionalServicesAllRequest = createAction('additional-services/fetchAllRequest');
export const additionalServicesAllSuccess = createAction('additional-services/fetchAllSuccess');
export const additionalServicesAllError = createAction('additional-services/fetchAllError');

export const categoriesAllRequest = createAction('categories/fetchAllRequest');
export const categoriesAllSuccess = createAction('categories/fetchAllSuccess');
export const categoriesAllError = createAction('categories/fetchAllError');

export const subCategoriesAllRequest = createAction('subCategories/fetchAllRequest');
export const subCategoriesAllSuccess = createAction('subCategories/fetchAllSuccess');
export const subCategoriesAllError = createAction('subCategories/fetchAllError');