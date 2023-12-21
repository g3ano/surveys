import { cn } from '@/lib/utils';

export default function NotFound({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-white border-main px-3 py-8 rounded-md', className)}
      {...props}
    >
      <div className='flex justify-center items-center'>
        <p className='text-slate-500'>{children}</p>
      </div>
    </div>
  );
}
