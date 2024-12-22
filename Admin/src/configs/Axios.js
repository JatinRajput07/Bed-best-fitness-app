import axios from 'axios';
import Cookies from 'js-cookie';

const URL = 'http://43.204.2.84:7200/';
// const URL = 'http://localhost:7200/';

const Axios = axios.create({
    baseURL: `${URL}`,
});

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken") || Cookies.get('jwt');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status >= 400 && error.response.status < 500) {
//             window.location.href = '/auth/sign-in';
//         }
//         return Promise.reject(error);
//     }
// );

export default Axios;
