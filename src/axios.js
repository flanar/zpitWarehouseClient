import axios from 'axios'
import { getAccessToken } from './redux/auth/authUtilities'
import store from './redux/store'
import { logout } from './redux'

export const authenticationHeader = () => {
    return { Authorization: `Bearer ${getAccessToken()}` }
}

export const api = axios.create({
    baseURL: '/',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

api.interceptors.response.use(
    response => response,
    async error => {
        const { status } = error.response;
        if (status === 401) await store.dispatch(logout())
        return Promise.reject(error)
    }
)