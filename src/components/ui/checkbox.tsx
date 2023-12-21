import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import { CheckIcon } from '@heroicons/react/24/outline';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-[1.2rem] w-[1.2rem] shrink-0 rounded-md border-main bg-white shadow-sm focus-main',
      'disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-indigo-500',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Icon
        name={CheckIcon}
        className='h-4 w-4 text-slate-100'
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
