import axiosClient from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export default function useGet(endpoint: string) {
  const [data, setData] = useState<any>([]);
  const [errors, setErrors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { token, setToken } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    axiosClient
      .get(endpoint)
      .then((res) => {
        setData(res.data);
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setErrors(err.response);
        setIsLoading(false);
      });
  }, [endpoint, token, setToken]);

  return {
    isError,
    isLoading,
    isSuccess,
    errors,
    data,
  };
}
