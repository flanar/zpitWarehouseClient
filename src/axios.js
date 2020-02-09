import axios from 'axios'

const api = axios.create({
    baseURL: 'api/'
})

api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.usertoken}`

export default api