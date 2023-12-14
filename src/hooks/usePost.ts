import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axios';

export default function usePost(endpoint: string, body: {}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axiosClient
            .post(endpoint, body)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                setErrors(err.response);
                setIsLoading(false);
            });
    }, [endpoint]);

    return {
        data,
        isError,
        errors,
        isLoading,
    };
}
