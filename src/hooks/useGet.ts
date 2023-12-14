import axiosClient from '@/lib/axios';
import { useEffect, useState } from 'react';

export default function useFetch(endpoint: string) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axiosClient
            .get(endpoint)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                setErrors(err.response);
            });
    }, [endpoint]);

    return {
        data,
        error: isError,
        errors,
        isLoading,
    };
}
