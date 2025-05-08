import axios from 'axios';
import requestInterceptor from './requestInterceptor';
import { responseInterceptor, responseErrorInterceptor } from './responseInterceptor';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT) || 10000,
    headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use(requestInterceptor);
axiosClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axiosClient;
