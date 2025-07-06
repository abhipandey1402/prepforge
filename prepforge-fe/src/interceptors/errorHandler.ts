import { AxiosError } from 'axios';

interface ErrorResponseData {
    message?: string;
}

function hasMessage(data: any): data is ErrorResponseData {
    return typeof data === 'object' && 'message' in data;
}

const errorHandler = (error: AxiosError) => {
    const { response } = error;

    switch (response?.status) {
        case 401:
            console.warn('Unauthorized: Redirecting to login...');
            break;
        case 403:
            console.warn('Forbidden: Access denied.');
            break;
        case 404:
            console.warn('Not Found: Resource unavailable.');
            break;
        case 500:
            console.error('Server Error: Please try again later.');
            break;
        default:
            const errorMessage =hasMessage(response?.data) ? response?.data?.message : 'An unexpected error occurred.';
            console.error(errorMessage);
    }

    return Promise.reject(error);
};

export default errorHandler;
