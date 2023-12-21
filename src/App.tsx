import { RouterProvider } from 'react-router-dom';
import router from '@/lib/router';
import AuthProvider from '@/hooks/useAuth';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
