import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-29574.firebaseio.com/'
});

export default instance;

