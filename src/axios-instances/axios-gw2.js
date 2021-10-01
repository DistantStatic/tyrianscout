import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL
console.log(BASE_URL)
const instance = axios.create({
    baseURL: BASE_URL
})

export default instance