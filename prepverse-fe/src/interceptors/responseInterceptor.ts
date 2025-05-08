import { AxiosResponse, AxiosError } from 'axios';
import retryRequest from './retryRequest';
import errorHandler from './errorHandler';

const responseInterceptor = (response: AxiosResponse) => response;

const responseErrorInterceptor = async (error: AxiosError) => {
    if (!error.response) {
        return retryRequest(error);
    }
    errorHandler(error);
    return Promise.reject(error);
};

export { responseInterceptor, responseErrorInterceptor };
