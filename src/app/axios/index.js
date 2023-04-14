import axios from "axios";
const { REACT_APP_API_URL } = process.env;

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios.create({
  baseURL: REACT_APP_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});
