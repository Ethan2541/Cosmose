import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cosmose.me'
});

export default instance;
