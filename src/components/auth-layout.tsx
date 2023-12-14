import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
    const { token } = useAuth();
    const navigate = useNavigate();
    console.log(token);
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <div className='w-full min-h-screen'>
            <div className='w-2/3 mx-auto'>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
