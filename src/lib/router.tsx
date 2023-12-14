import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import DefaultLayout from '@/components/default-layout';
import AuthLayout from '@/components/auth-layout';
import Register from '@/pages/register';
import Surveys from '@/pages/surveys';
import Login from '@/pages/login';

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/surveys',
                element: <Surveys />,
            },
        ],
    },
]);

export default router;
