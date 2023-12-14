import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const navigation = [
    {
        id: 1,
        title: 'home',
        to: '/',
    },
    {
        id: 2,
        title: 'surveys',
        to: '/surveys',
    },
    {
        id: 3,
        title: 'register',
        to: '/register',
    },
];

export default function DefaultLayout() {
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    return (
        <div className='w-full min-h-screen'>
            <div className='w-2/3 mx-auto'>
                <nav className='flex items-center justify-between py-4 pt-8'>
                    <div className='flex items-center'>
                        <span className='font-bold text-xl inline-block'>
                            Surveys Editor
                        </span>
                    </div>
                    <div className='flex items-center gap-8'>
                        {navigation.map(({ id, title, to }) => {
                            return (
                                <div
                                    key={id}
                                    className='flex items-center'
                                >
                                    <Link
                                        to={to}
                                        className='hover:underline inline-block capitalize'
                                    >
                                        {title}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
