import axios from 'axios';

// define the base url
const baseURL = 'https://password-reset-h1ej.onrender.com/api/v1';

// create an axios instance
const instance = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;