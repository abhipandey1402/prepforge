import { useState, useEffect } from 'react';
import { useJwt } from 'react-jwt';

interface DecodedToken {
    // Define the structure of your decoded token here, if known.
    [key: string]: any;
}

interface UseTokenExpiryReturn {
    isSessionExpired: boolean;
}

const useTokenExpiry = (token: string | undefined): UseTokenExpiryReturn => {
    const { isExpired, decodedToken } = useJwt<DecodedToken>(token || '');
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    useEffect(() => {
        const checkTokenExpiry = () => {
            if (decodedToken !== null && isExpired) {
                setIsSessionExpired(true);
            }
        };

        // Check token expiry immediately
        checkTokenExpiry();

        // Set an interval to check the token expiry periodically
        const interval = setInterval(checkTokenExpiry, 1000 * 60); // Check every minute

        return () => clearInterval(interval);
    }, [isExpired, decodedToken]);

    return { isSessionExpired };
};

export default useTokenExpiry;
