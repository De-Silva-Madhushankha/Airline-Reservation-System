import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3001/api', // API server
  timeout: 1000, // Optional: Set a timeout for requests
});

export default axios;