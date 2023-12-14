import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/form/input';
import { useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/form/register-form';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(formData);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch('/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.status !== 200) {
            throw new Error('failed to authenticate');
        }

        const data = await res.json();
        setToken(data.token);

        setIsLoading(false);
    };

    return (
        <div className='flex items-center'>
            <div className='mt-8 mx-auto'>
                <div className='my-8'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='font-bold text-3xl capitalize'>
                            register
                        </h2>
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
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
