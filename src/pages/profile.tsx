import { Card, CardContent } from '@/components/ui/card';
import SubHeader from '@/components/ui/sub-header';
import useGet from '@/hooks/useGet';

interface DataType {
  data: {
    user: {
      id: number;
      email: string;
      username: string;
    };
  };
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export default function Profile() {
  const { data, isError, isLoading, isSuccess }: DataType = useGet('/user');

  return (
    <div>
      <SubHeader head='profile' />
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <Card>
          <CardContent>
            <div className='flex flex-col gap-1 py-2 px-1'>
              <div className='flex items-center'>
                <span className='w-40 uppercase'>id</span>
                <span>{data.user.id}</span>
              </div>
              <div className='flex items-center'>
                <span className='w-40 uppercase'>username</span>
                <span>{data.user.username}</span>
              </div>
              <div className='flex items-center'>
                <span className='w-40 uppercase'>email</span>
                <span>{data.user.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {isError && <div>error occurred</div>}
    </div>
  );
}
