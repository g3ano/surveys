import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

type RadiusType = 'top' | 'bottom' | 'all' | 'none';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMessage?: string;
    rounded?: RadiusType;
}

export default function Input({
    type,
    className,
    rounded = 'all',
    error,
    errorMessage,
    ...props
}: InputProps) {
    return (
        <div className='flex-1'>
            <input
                type={type}
                className={cn(
                    'block w-full h-9 px-2 py-1 border border-slate-300 focus-within:border-indigo-900 focus-visible:outline-indigo-900 focus:outline-2 focus:outline-offset-0 placeholder:text-slate-500 placeholder:capitalize',
                    className,
                    { 'rounded-md': rounded === 'all' },
                    { 'rounded-none': rounded === 'none' },
                    { 'rounded-t-md': rounded === 'top' },
                    { 'rounded-b-md': rounded === 'bottom' }
                )}
                {...props}
            />
            {error && (
                <div>
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
}
