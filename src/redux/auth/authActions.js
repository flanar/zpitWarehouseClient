import axios from 'axios'

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
        axios.post('login', {
            email: user.email,
            password: user.password
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data.token)
            dispatch(loginSuccess())
        })
        .catch(err => {
            console.log(err)
            dispatch(loginFailure(err))
        })
    }
}

export const logout = () => {
    localStorage.removeItem('usertoken')
    return {
        type: LOGOUT
    }
}

export const checkAuth = () => {
    return dispatch => {
        if(localStorage.getItem('usertoken'))
            dispatch(loginSuccess())
        else
            dispatch(logout())
    }
}