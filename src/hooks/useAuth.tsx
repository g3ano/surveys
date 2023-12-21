import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type userType = {
  id: any;
  username: string;
  email: string;
};

interface AuthContext {
  user: userType;
  token: string;
  setToken: (token: string) => void;
  setUser: Dispatch<SetStateAction<userType>>;
}

const AuthContext = createContext<AuthContext>({
  user: {
    id: '',
    username: '',
    email: '',
  },
  setUser: () => {},
  token: '',
  setToken: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
  });
  const [token, _setToken] = useState(localStorage.getItem('token') || '');
  const setToken = (token: string) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    _setToken(token);
  };
  const values = {
    user,
    setUser,
    token,
    setToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
