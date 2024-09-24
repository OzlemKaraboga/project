import { useState } from 'react';

export const useFetch = (url, onReceived) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const getJson = async () => {
        setError(false);
        setIsLoading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                setError(true);
            }
            const data = await response.json();
            onReceived(data);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return [isLoading, error, getJson];
};