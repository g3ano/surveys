import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../ui/button';
import Input from './input';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
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
    };

    return (
        <div className='bg-slate-100'>
            <form onSubmit={handleSubmit}>
                <div className='w-96 rounded-md'>
                    <div className='flex items-center'>
                        <Input
                            type='text'
                            id='username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='username'
                            rounded='top'
                        />
                    </div>
                    <div>
                        <Input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='email'
                            rounded='none'
                            className='border-y-transparent'
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
                            rounded='none'
                            className='border-b-transparent'
                        />
                    </div>
                    <div>
                        <Input
                            type='password'
                            id='password_confirmation'
                            name='password_confirmation'
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder='password confirmation'
                            rounded='bottom'
                        />
                    </div>
                    <div className='mt-8'>
                        <div className='flex items-center justify-between'>
                            <Button
                                className='w-full'
                                disabled={isLoading}
                            >
                                {!isLoading && <span>Register</span>}
                                {isLoading && <span>loading...</span>}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
