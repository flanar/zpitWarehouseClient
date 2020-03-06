import { api } from '../../axios'
import { setLocalStorageTokens, removeLocalStorageTokens, getAccessToken } from './authUtilities'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./authTypes"

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

export const loginFailure = error => {
    return {
        type: LOGIN_FAILURE,
        error: error
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loginRequest())
        api.post('login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            setLocalStorageTokens(res.data)
            dispatch(loginSuccess())
        })
        .catch(err => {
            console.log(err)
            dispatch(loginFailure(err))
        })
    }
}

export const logout = () => {
    removeLocalStorageTokens()
    return {
        type: LOGOUT
    }
}

export const checkAuth = () => {
    return dispatch => {
        if(getAccessToken())
            dispatch(loginSuccess())
        else
            dispatch(logout())
    }
}