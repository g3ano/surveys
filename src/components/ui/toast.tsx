import { capitalize } from '@/lib/utils';

type ToastProps = {
  message: string;
};
export default function Toast({ message }: ToastProps) {
  return (
    <div className='absolute bottom-0 right-0 bg-red-500 px-8 py-5 m-4 rounded-md text-white'>
      <div>{capitalize(message)}</div>
    </div>
  );
}
