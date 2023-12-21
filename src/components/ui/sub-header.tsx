import Button, { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { capitalize } from '@/lib/utils';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { VariantProps } from 'class-variance-authority';
import { To, useNavigate } from 'react-router-dom';

type SubHeaderProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    link?: To & (number | string);
    head: string;
    withButton?: boolean;
    asChild?: boolean;
  };

export default function SubHeader({
  link,
  head,
  withButton = false,
  children,
  asChild = false,
  ...props
}: SubHeaderProps) {
  const navigate = useNavigate();

  const goBackHistory = (link: To & (number | string) = -1) => {
    navigate(link);
  };

  return (
    <div className='flex items-center justify-between my-10 mb-12'>
      <div className='flex items-center gap-4'>
        <Button
          shape='icon'
          intent='ghost'
          onClick={() => goBackHistory(link)}
        >
          <Icon
            name={ArrowLeftIcon}
            className='h-7 w-7'
          />
        </Button>

        <h2 className='text-4xl font-semibold tracking-tight'>
          {capitalize(head)}
        </h2>
      </div>
      {withButton && (
        <div className='flex items-center'>
          <Button
            className='cursor-pointer'
            asChild={asChild}
            {...props}
          >
            {children}
          </Button>
        </div>
      )}
    </div>
  );
}
