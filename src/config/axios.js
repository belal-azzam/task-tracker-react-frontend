import axios from 'axios';
import {API_URL} from "./constants";

const axiosApi = axios.create({
    baseURL: API_URL
});

axiosApi.interceptors.request.use((config) => {
    let token = localStorage.getItem('authToken');
    if(token){
        config.headers['Authorization'] = token;
    }
    return config;

}, error => {
    return Promise.reject(error);
});

export default axiosApi;
