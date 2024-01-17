import axios from 'axios'
import { Dispatch } from 'redux'
import { Alert } from 'react-native'

import { DataAction } from './types'
import { dataActions as actions } from '.'

export const citiesFetchAll = (i18n: any) => (dispatch: Dispatch<DataAction>) => {
    dispatch(actions.citiesAllRequest())

    axios({
        method: 'GET',
        url: `/cities/${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.citiesAllSuccess(res.data))
        })
        .catch((error) => {
            Alert.alert(
                'Error!',
                error.message || "",
                [
                    {
                        text: 'OK'
                    }
                ]
            )
            dispatch(actions.citiesAllError(error))
        })
}

export const addtionalServicesFetchAll = (i18n: any) => (dispatch: Dispatch<DataAction>) => {
    dispatch(actions.additionalServicesAllRequest())

    axios({
        method: 'GET',
        url: `/additional-services/${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.additionalServicesAllSuccess(res.data))
        })
        .catch((error) => {
            // alert(error)
            dispatch(actions.additionalServicesAllError(error))
        })
}

export const categoriesFetchAll = (i18n: any) => (dispatch: Dispatch<DataAction>) => {
    dispatch(actions.categoriesAllRequest())

    axios({
        method: 'GET',
        url: `/categories/${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.categoriesAllSuccess(res.data))
        })
        .catch((error) => {
            // alert(error)
            dispatch(actions.categoriesAllError(error))
        })
}

export const subCategoriesFetchAll = (i18n: any) => (dispatch: Dispatch<DataAction>) => {
    dispatch(actions.subCategoriesAllRequest())

    axios({
        method: 'GET',
        url: `/sub-categories/${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.subCategoriesAllSuccess(res.data))
        })
        .catch((error) => {
            // alert(error)
            dispatch(actions.subCategoriesAllError(error))
        })
}

export const brandFetchAll = (i18n: any) => (dispatch: Dispatch<DataAction>) => {
    dispatch(actions.brandAllRequest())

    axios({
        method: 'GET',
        url: `/cars-brands/${i18n.language}`,
    })
        .then((res) => {
            dispatch(actions.brandAllSuccess(res.data))
        })
        .catch((error) => {
            // alert(error)
            dispatch(actions.brandAllError(error))
        })
}