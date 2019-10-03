import { useState, useEffect } from 'react';

export default axios => {
    const [error, setError] = useState(null);

    const requestInterceptors = axios.interceptors.request.use(request => {
        setError(null);
        return request;
    });

    const responseInterceptors = axios.interceptors.response.use(response => response, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        };
    }, [requestInterceptors, responseInterceptors]);

    const clearError = () => {
        setError(null);
    }

    return [error, clearError];
};
