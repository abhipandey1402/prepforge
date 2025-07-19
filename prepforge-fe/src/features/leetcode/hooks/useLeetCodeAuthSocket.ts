import { useEffect, useState, useCallback } from "react";
import { useSocket } from "@/features/chat/utils/SocketContext";
import { useDispatch } from "react-redux";
import { updateLeetcodeSessionToken } from "@/features/user/slices/authSlice";

// Utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict${secure}`;
};

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};

// Hook
export const useLeetCodeAuthSocket = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { socket } = useSocket();

    // Check cookie on mount
    useEffect(() => {
        const existingToken = getCookie("leetcode_session_token");
        if (existingToken) {
            setSessionToken(existingToken);
            setIsAuthenticated(true);
            dispatch(updateLeetcodeSessionToken(existingToken));
        }
    }, []);

    // Listen to socket events
    useEffect(() => {
        if (!socket) return;

        const handleAuthSuccess = (data: any) => {
            console.log("Socket auth success:", data);

            if (data?.authSuccess && data?.sessionToken) {
                const token = data.sessionToken;
                setCookie("leetcode_session_token", token, 7);
                setSessionToken(token);
                setIsAuthenticated(true);
                dispatch(updateLeetcodeSessionToken(token));
            } else {
                setError("Invalid auth response from socket");
            }
        };

        socket.on("auth-success", handleAuthSuccess);

        return () => {
            socket.off("auth-success", handleAuthSuccess);
        };
    }, [socket]);

    const logout = useCallback(() => {
        deleteCookie("leetcode_session_token");
        setIsAuthenticated(false);
        setSessionToken(null);
        dispatch(updateLeetcodeSessionToken(""));
    }, []);

    return {
        isAuthenticated,
        sessionToken,
        error,
        logout,
    };
};
