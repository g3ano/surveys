import { cn } from '@/lib/utils';
import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({
    children,
    className,
    htmlFor,
    ...props
}: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={cn('w-full', className)}
            {...props}
        >
            {children}
        </label>
    );
}
