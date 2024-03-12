import axios from "axios";
import { getEnvVariables } from "../helpers";

const {VITE_API_URL, VITE_API_KEY} = getEnvVariables();



const hotelbedsApi = axios.create({
  baseURL: VITE_API_URL
});


hotelbedsApi.interceptors.request.use( config => {

  config.headers = {
      ...config.headers,
      'Api-Key': VITE_API_KEY,
  },
  config.params = {
    ...config.params,

  }

  return config;
})

export default hotelbedsApi;