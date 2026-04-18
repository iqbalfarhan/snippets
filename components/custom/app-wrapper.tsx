import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const AppWrapper = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div className={cn('w-full max-w-6xl mx-auto', className)} {...props}>
      {children}
    </div>
  );
};

export default AppWrapper;
