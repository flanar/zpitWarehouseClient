import axios from 'axios'

export const register = newUser => {
    return axios
        .post('register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            console.log(res)
            return { status: "success" }
        })
        .catch(err => {
            console.log(err)
        })
}