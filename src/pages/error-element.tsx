import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorElement() {
  const error: any = useRouteError();
  let message = "This page doesn't exist!";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "This page doesn't exist!";
    }

    if (error.status === 401) {
      message = "You aren't authorized to see this";
    }

    if (error.status === 503) {
      message = 'Looks like our API is down';
    }
  }

  return (
    <section className='bg-inherit'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 sm:mt-20'>
        <div className='mx-auto max-w-screen-sm text-center space-y-4'>
          <h1 className='text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600'>
            {error.status}
          </h1>
          <p className='text-3xl tracking-tight font-bold text-gray-900 md:text-4xl'>
            {message}
          </p>
          <p className='text-lg font-light text-gray-500'>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Link
            to='/'
            replace
            className={cn(
              buttonVariants({
                shape: 'button',
                intent: 'secondary',
              })
            )}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
