import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Input from './input';
import Button from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import axiosClient from '@/lib/axios';

type errorType = {
    email: '' | [];
    password: '' | [];
};

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { setToken, setUser } = useAuth();
    const [errors, setErrors] = useState<errorType>({
        email: '',
        password: '',
    });
    useEffect(() => {
        setTimeout(() => {
            setErrors({
                email: '',
                password: '',
            });
        }, 5000);
    }, [errors, setErrors]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(formData);
    };
    function handleSubmit(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault();

        axiosClient
            .post('/login', formData)
            .then((res) => {
                if (res.status === 200) {
                    setToken(res.data.token);
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                const errors = err.response.data.errors;
                setErrors({
                    email: errors?.email,
                    password: errors?.password,
                });
            });
    }

    return (
        <div className='bg-slate-100'>
            {errors && <div>{errors?.password}</div>}
            {errors && <div>{errors?.email}</div>}
            <form>
                <div className='w-96 rounded-md'>
                    <div>
                        <Input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='email'
                            rounded='top'
                            className=''
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
                            rounded='bottom'
                            className='border-t-transparent'
                        />
                    </div>
                    <div className='mt-8'>
                        <div className='flex items-center justify-between'>
                            <Button
                                onClick={handleSubmit}
                                className='w-full'
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
