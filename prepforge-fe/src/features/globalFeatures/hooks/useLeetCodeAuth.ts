import { updateLeetcodeSessionToken } from "@/features/user/slices/authSlice";
import axiosClient from "@/interceptors/axiosClient";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${secure}`;
};

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};

export function useLeetCodeAuth() {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    // Check existing auth on mount
    useEffect(() => {
        const token = getCookie('leetcode_session_token');
        if (token) {
            setSessionToken(token);
            setIsAuthenticated(true);
            dispatch(updateLeetcodeSessionToken(token));
        }
        setIsLoading(false);
    }, []);

    const authorize = useCallback(async () => {
        try {
            setIsAuthorizing(true);
            setError(null);

            const response = await axiosClient.get('/leetcode/session-token');

            console.log(response);

            if (response?.data?.success && response?.data?.data?.leetcodeSessionToken) {
                const token = response?.data?.data?.leetcodeSessionToken;

                // Store token in cookie (expires in 7 days by default)
                setCookie('leetcode_session_token', token, 7);
                setSessionToken(token);
                setIsAuthenticated(true);
                dispatch(updateLeetcodeSessionToken(token));
            } else {
                throw new Error(response?.data?.message || 'Authorization failed');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Authorization failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsAuthorizing(false);
        }
    }, []);

    const logout = useCallback(() => {
        // Remove token from cookie
        deleteCookie('leetcode_session_token');
        setSessionToken(null);
        setIsAuthenticated(false);
        setError(null);
        dispatch(updateLeetcodeSessionToken(""));
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isAuthenticated,
        isLoading,
        isAuthorizing,
        error,
        sessionToken,
        authorize,
        logout,
        clearError,
    };
}