import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://51.68.224.40:80'
});

export default instance;