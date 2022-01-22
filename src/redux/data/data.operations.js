import axios from 'axios'
import { dataActions as actions } from './'

export const citiesFetchAll = (i18n) => (dispatch) => {
    dispatch(actions.citiesAllRequest())

    axios({
        method: 'GET',
        url: `cities?locale=${i18n.language}&sort=id%3Aasc&populate=*`,
    })
        .then((res) => {
            dispatch(actions.citiesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.citiesAllError(error))
        })
}

export const addtionalServicesFetchAll = (i18n) => (dispatch) => {
    dispatch(actions.additionalServicesAllRequest())

    axios({
        method: 'GET',
        url: `additional-services?${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.additionalServicesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.additionalServicesAllError(error))
        })
}

export const categoriesFetchAll = (i18n) => (dispatch) => {
    dispatch(actions.categoriesAllRequest())

    axios({
        method: 'GET',
        url: `categories?locale=${i18n.language}&sort=id%3Aasc`,
    })
        .then((res) => {
            dispatch(actions.categoriesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.categoriesAllError(error))
        })
}

export const subCategoriesFetchAll = (i18n) => (dispatch) => {
    dispatch(actions.subCategoriesAllRequest())

    axios({
        method: 'GET',
        url: `sub-categories?locale=${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.subCategoriesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.subCategoriesAllError(error))
        })
}

export const brandFetchAll = (i18n) => (dispatch) => {
    dispatch(actions.brandAllRequest())

    axios({
        method: 'GET',
        url: `brand-cars?locale=${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.brandAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.brandAllError(error))
        })
}