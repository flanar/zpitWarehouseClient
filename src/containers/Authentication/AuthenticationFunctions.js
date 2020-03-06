import { api } from '../../axios'

export const register = newUser => {
    return api.post('register', newUser)
        .then(res => {
            console.log(res)
            return { status: "success" }
        })
        .catch(err => {
            console.log(err)
        })
}