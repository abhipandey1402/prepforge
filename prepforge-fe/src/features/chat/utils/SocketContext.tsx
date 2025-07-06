/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

interface PersistRoot {
    auth?: string;
}

interface Auth {
    userData?: {
        accessToken?: string;
    };
}

// Function to establish a socket connection with authorization token
const getSocket = () => {
    const persistRoot = JSON.parse(localStorage.getItem('persist:root') || '{}') as PersistRoot;
    const auth = persistRoot?.auth ? JSON.parse(persistRoot.auth) as Auth : null;
    const accessToken = auth?.userData?.accessToken;

    // Create a socket connection with the provided URI and authentication
    const socket = socketio(import.meta.env.VITE_SOCKET_URI, {
        withCredentials: true,
        auth: { accessToken },
    });

    return socket;
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
    socket: ReturnType<typeof socketio> | null;
}>({
    socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext);

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // State to store the socket instance
    const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
        null
    );

    useEffect(() => {
        const initializedSocket = getSocket();
        setSocket(initializedSocket);

        return () => {
            initializedSocket.disconnect();
        };
    }, []);

    return (
        // Provide the socket instance through context to its children
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };
