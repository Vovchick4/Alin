import axios from 'axios'

import { dataActions as actions } from './'

export const citiesFetchAll = () => (dispatch) => {
    dispatch(actions.citiesAllRequest())

    axios({
        method: 'GET',
        url: 'cities?sort=id%3Aasc&populate=*',
    })
        .then((res) => {
            dispatch(actions.citiesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.citiesAllError(error))
        })
}

export const addtionalServicesFetchAll = () => (dispatch) => {
    dispatch(actions.additionalServicesAllRequest())

    axios({
        method: 'GET',
        url: 'additional-services',
    })
        .then((res) => {
            dispatch(actions.additionalServicesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.additionalServicesAllError(error))
        })
}

export const categoriesFetchAll = () => (dispatch) => {
    dispatch(actions.categoriesAllRequest())

    axios({
        method: 'GET',
        url: 'categories?sort=id%3Aasc',
    })
        .then((res) => {
            dispatch(actions.categoriesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.categoriesAllError(error))
        })
}

export const subCategoriesFetchAll = () => (dispatch) => {
    dispatch(actions.subCategoriesAllRequest())

    axios({
        method: 'GET',
        url: 'sub-categories',
    })
        .then((res) => {
            dispatch(actions.subCategoriesAllSuccess(res.data.data))
        })
        .catch((error) => {
            alert(error)
            dispatch(actions.subCategoriesAllError(error))
        })
}