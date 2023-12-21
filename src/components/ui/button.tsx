import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

export const buttonVariants = cva(
  'flex items-center justify-center rounded-md focus-main disabled:pointer-events-none disabled:opacity-50 disabled:select-none',
  {
    variants: {
      shape: {
        button: ['h-9 px-4 py-1'],
        icon: ['h-9 aspect-square'],
        link: ['hover:underline'],
      },
      intent: {
        default: ['bg-indigo-500 text-slate-50', 'hover:bg-indigo-700'],
        secondary: [
          'bg-indigo-100 text-indigo-500',
          'hover:bg-indigo-500 hover:text-slate-50',
        ],
        outline: [
          'border border-slate-300 bg-white/60 shadow-sm',
          ' hover:bg-indigo-500 hover:text-slate-100',
        ],
        ghost: ['hover:bg-indigo-300/40', 'text-base'],
        danger: ['hover:bg-red-700', 'bg-red-500 text-white', 'text-base'],
      },
    },
    defaultVariants: {
      intent: 'default',
      shape: 'button',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ intent, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
