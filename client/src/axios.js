import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://51.68.224.40:3001'
});

export default instance;