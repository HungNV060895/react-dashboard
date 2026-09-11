import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://6a9fe5ab3e0d88d3d7e5250d.mockapi.io/api/v1/',
    timeout: 1000
});

export default axiosClient;