import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SubHeader from '@/components/ui/sub-header';
import axiosClient from '@/lib/axios';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Logout() {
  const handleClick = () => {
    axiosClient.post('/logout').then(() => {
      localStorage.removeItem('token');
      window.location.reload();
    });
  };

  return (
    <>
      <SubHeader head='Logout' />
      <Card>
        <CardContent className='justify-center'>
          <div className='flex flex-col items-center justify-center gap-5'>
            <div>
              <p>Click below to logout from your account</p>
            </div>
            <Button
              onClick={handleClick}
              className='gap-2'
            >
              <Icon
                name={ArrowTopRightOnSquareIcon}
                isButton
              />
              <p>Logout</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
