import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import DefaultLayout from '@/components/default-layout';
import AuthLayout from '@/components/auth-layout';
import Register from '@/pages/register';
import Surveys from '@/pages/survey/surveys';
import Login from '@/pages/login';
import Profile from '@/pages/profile';
import Logout from '@/pages/logout';
import SurveyLayout from '@/components/survey-layout';
import ErrorElement from '@/pages/error-element';
import SurveyEdit from '@/pages/survey/survey-edit';
import SurveyCreate from '@/pages/survey/survey-create';
import SurveyPublic from '@/pages/survey/survey-public';
import Thanks from '@/pages/thanks';

const router = createBrowserRouter([
  {
    errorElement: <ErrorElement />,
    children: [
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
            element: <SurveyLayout />,
            children: [
              {
                path: '/surveys/',
                element: <Surveys />,
              },
              {
                path: '/surveys/create',
                element: <SurveyCreate />,
              },
              {
                path: '/surveys/:surveyId/edit',
                element: <SurveyEdit />,
              },
            ],
          },
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/logout',
            element: <Logout />,
          },
        ],
      },
      {
        path: '/surveys/public/:surveySlug',
        element: <SurveyPublic />,
      },
      {
        path: '/surveys/public/thanks',
        element: <Thanks />,
      },
    ],
  },
]);

export default router;
