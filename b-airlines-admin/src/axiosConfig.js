import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3001/api', // API server
});

export default axios;