import { cn } from '@/lib/utils';

interface IconProps {
    name: React.ForwardRefExoticComponent<
        React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
            React.RefAttributes<SVGSVGElement>
    >;
    intent?: 'white';
    className?: string;
}

export default function Icon({ className, ...props }: IconProps) {
    return (
        <props.name
            className={cn(
                'h-6 w-6 text-slate-900',
                {
                    'text-slate-200': props.intent,
                },
                className
            )}
        />
    );
}
