import { InternalAxiosRequestConfig } from 'axios';

interface PersistRoot {
    auth?: string;
}

interface Auth {
    userData?: {
        accessToken?: string;
    };
}

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const persistRoot = JSON.parse(localStorage.getItem('persist:root') || '{}') as PersistRoot;
    const auth = persistRoot?.auth ? JSON.parse(persistRoot.auth) as Auth : null;
    const accessToken = auth?.userData?.accessToken;

    if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
};

export default requestInterceptor;
