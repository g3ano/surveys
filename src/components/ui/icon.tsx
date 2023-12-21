import { cn } from '@/lib/utils';

interface IconProps {
  name: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
      React.RefAttributes<SVGSVGElement>
  >;
  intent?: 'white' | 'red';
  className?: string;
  isButton?: boolean;
}

export default function Icon({ className, isButton, ...props }: IconProps) {
  return (
    <props.name
      className={cn(
        'h-6 w-6',
        {
          'text-slate-200': props.intent === 'white',
        },
        {
          'text-red-500': props.intent === 'red',
        },
        {
          'h-[1.15rem] w-[1.15rem]': isButton,
        },
        className
      )}
    />
  );
}
