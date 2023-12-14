import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
    'flex items-center justify-center rounded-md focus-within:border-indigo-900 focus-visible:outline-indigo-900 focus:outline-2 focus:outline-offset-0 disabled:pointer-events-none disabled:opacity-50 disabled:select-none',
    {
        variants: {
            shape: {
                button: ['h-9 px-4 py-1'],
                icon: ['h-9 aspect-square'],
            },
            intent: {
                default: ['bg-indigo-500 text-slate-50', 'hover:bg-indigo-700'],
                secondary: [
                    'bg-slate-200 text-slate-800',
                    'hover:bg-indigo-700',
                ],
                link: ['hover:underline', 'text-base'],
            },
        },
        defaultVariants: {
            intent: 'default',
            shape: 'button',
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export default function Button({
    children,
    className,
    intent,
    shape,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ intent, shape, className }))}
            {...props}
        >
            {children}
        </button>
    );
}
