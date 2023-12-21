import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

type RadiusType = 'top' | 'bottom' | 'all' | 'none';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errors?: [];
  rounded?: RadiusType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, className, rounded = 'all', isError = false, errors, ...props },
    ref
  ) => {
    return (
      <div className='space-y-0.5'>
        <input
          type={type}
          className={cn(
            'block w-full h-9 px-2 py-1.5 border-main',
            'focus-main placeholder:text-slate-500 placeholder:text-sm',
            className,
            { 'rounded-md': rounded === 'all' },
            { 'rounded-none': rounded === 'none' },
            { 'rounded-t-md': rounded === 'top' },
            { 'rounded-b-md': rounded === 'bottom' }
          )}
          ref={ref}
          {...props}
        />
        {isError && (
          <div className='bg-red-500 px-2 py-1 rounded-md'>
            <span className='text-white'>{errors}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
