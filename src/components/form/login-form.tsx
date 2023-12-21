import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Input from './input';
import Button from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import axiosClient from '@/lib/axios';

type errorType = {
  email?: [];
  password?: [];
};

export default function LoginForm({
  emailRef,
}: {
  emailRef: React.MutableRefObject<any>;
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setToken, setUser } = useAuth();
  const [errors, setErrors] = useState<errorType>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setErrors({});

    axiosClient
      .post('/login', formData)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.token);
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        const errors: errorType = err.response.data.errors;

        if (errors?.email) {
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
    <div className='bg-inherit'>
      <form>
        <div className='w-96 rounded-md space-y-2'>
          <div>
            <Input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='email'
              ref={emailRef}
              isError={Boolean(errors.email)}
              errors={errors.email}
            />
          </div>
          <div>
            <Input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='password'
              isError={Boolean(errors.password)}
              errors={errors.password}
            />
          </div>
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <Button
              onClick={handleSubmit}
              className='w-full'
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
