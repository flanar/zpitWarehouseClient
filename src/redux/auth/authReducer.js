import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./authTypes"

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null
}

const loginRequest = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const loginSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null
    }
}

const loginFailure = (state, action) => {
    return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.error
    }
}

const logout = (state, action) => {
    return {
        ...state,
        isAuthenticated: false
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST: return loginRequest(state, action)
        case LOGIN_SUCCESS: return loginSuccess(state, action)
        case LOGIN_FAILURE: return loginFailure(state, action)
        case LOGOUT: return logout(state, action)
        default: return state
    }
}

export default reducer