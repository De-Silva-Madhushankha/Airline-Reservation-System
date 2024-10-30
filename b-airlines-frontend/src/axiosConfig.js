import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://airline-reservation-system-production.up.railway.app/', // API server
});

export default axios;