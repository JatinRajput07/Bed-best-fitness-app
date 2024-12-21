import axios from 'axios';
import Cookies from 'js-cookie';
// import Router from 'next/router'; // Use Router directly for navigation instead of useRouter

const URL = 'http://43.204.2.84:7200/'; // Correct base URL
// const URL = 'http://localhost:7200/'; // dev base URL

const Axios = axios.create({
    baseURL: `${URL}`,
});

// Request interceptor to attach token
Axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jwt');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);s
    }
);

// Response interceptor to handle errors and redirect
// Axios.interceptors.response.use(
//     (response) => {
//         return response; 
//     },
//     async (error) => {
//         if (error.response && error.response.status >= 400 && error.response.status < 500) {
//             await Router.push('login'); // Use Router.push for redirect in Next.js
//         }
//         return Promise.reject(error);
//     }
// );

export default Axios;
