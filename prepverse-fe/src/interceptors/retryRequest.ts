import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const retryRequest = async (error: AxiosError) => {
    const config = error.config as CustomAxiosRequestConfig;

    if (config && !config._retry) {
        config._retry = true; // Mark this request as retried
        return axios(config);
    }

    return Promise.reject(error);
};

export default retryRequest;
