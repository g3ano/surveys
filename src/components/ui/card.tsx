import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-md shadow-md min-h-[10rem]',
        'flex flex-col',
        'animate-fade-in-down delay-200',
        className
      )}
    >
      {children}
    </div>
  );
}

type CardContentProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};

function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div
      className={cn('h-full py-4 px-5', 'flex flex-col flex-1', className)}
      {...props}
    >
      {children}
    </div>
  );
}

type CardTitleProps = React.HtmlHTMLAttributes<HTMLHeadingElement> & {
  underline?: boolean;
};

function CardTitle({
  children,
  className,
  underline,
  ...props
}: CardTitleProps) {
  return (
    <div
      className={cn('py-5 px-5 flex flex-col', {
        'border-b border-slate-300/50 pb-4': underline,
      })}
    >
      <h2
        className={cn('text-center text-2xl font-semibold', className)}
        {...props}
      >
        {children}
      </h2>
    </div>
  );
}

type CardFooterProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};

function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('py-5 px-5', 'mt-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardContent, CardTitle, CardFooter };
