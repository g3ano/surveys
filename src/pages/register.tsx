import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/form/register-form';
import { Link } from 'react-router-dom';
import axiosClient from '@/lib/axios';

export type formDataType = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type errorType = {
  username?: [];
  email?: [];
  password?: [];
};

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const { setToken, setUser } = useAuth();
  const [errors, setErrors] = useState<errorType>({});
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef<any>(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setErrors({});
    setIsLoading(false);

    axiosClient
      .post('/register', formData)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.token);
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        const errors: errorType = err.response.data.errors;

        if (errors?.username) {
          setErrors((prev) => ({
            ...prev,
            username: errors?.username,
          }));
        } else if (errors?.email) {
          setErrors((prev) => ({
            ...prev,
            email: errors?.email,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            password: errors?.password,
          }));
        }
      });
  }

  return (
    <div className='flex items-center'>
      <div className='mt-8 mx-auto'>
        <div className='my-8'>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='font-bold text-3xl capitalize'>register</h2>
            <div className='space-x-1 mt-4 text-slate-800/70 text-sm'>
              <span>or</span>
              <Link
                className='inline-block text-indigo-500 font-bold capitalize'
                to='/login'
              >
                login
              </Link>
              <span>if you already a member</span>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <RegisterForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            errors={errors}
            usernameRef={usernameRef}
          />
        </div>
      </div>
    </div>
  );
}
