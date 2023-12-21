import Button, { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { UserIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

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
];

const userNavigation = [
  {
    id: 1,
    title: 'profile',
    to: '/profile',
  },
  {
    id: 2,
    title: 'logout',
    to: '/logout',
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
      <div className='bg-white shadow-sm py-1 overflow-hidden sm:overflow-auto'>
        <div className='w-full md:w-2/3 md:mx-auto'>
          <nav className='flex items-center py-2'>
            <div className='flex items-center gap-10'>
              <div className='flex items-center'>
                <span className='font-bold text-xl inline-block uppercase tracking-tight'>
                  Surveys Editor
                </span>
              </div>
              <div className='flex items-center gap-1'>
                {navigation.map(({ id, title, to }) => {
                  return (
                    <NavLink
                      key={id}
                      to={to}
                      className={({ isActive }) =>
                        cn(
                          'hover:underline inline-block capitalize',
                          buttonVariants({
                            shape: 'button',
                            intent: 'ghost',
                          }),
                          { 'bg-slate-300/40': isActive }
                        )
                      }
                    >
                      {title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className='ms-auto'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    shape='icon'
                    intent='ghost'
                  >
                    <Icon name={UserIcon} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-40'>
                  {userNavigation.map(({ id, title, to }) => {
                    return (
                      <DropdownMenuItem
                        asChild
                        key={id}
                      >
                        <Link
                          className='capitalize cursor-pointer'
                          to={to}
                        >
                          {title}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
      <main className='md:w-2/3 md:mx-auto pb-20 my-10'>
        <Outlet />
      </main>
    </div>
  );
}
