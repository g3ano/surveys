import { Link } from 'react-router-dom';
import LoginForm from '@/components/form/login-form';

export default function Login() {
    return (
        <div className='flex items-center'>
            <div className='mt-8 mx-auto'>
                <div className='my-8'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='font-bold text-3xl capitalize'>Login</h2>
                        <div className='space-x-1 mt-4 text-slate-800/70 text-sm'>
                            <span>or</span>
                            <Link
                                className='inline-block text-indigo-500 font-bold capitalize'
                                to='/register'
                            >
                                register
                            </Link>
                            <span>if you aren't a member</span>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
