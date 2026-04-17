import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'react';

type Props = ComponentProps<'div'> & {
  columns?: 1 | 2 | 3 | 4;
};

const Grid: FC<Props> = ({ children, className, columns = 4, ...props }) => {
  const columnClass = {
    1: 'grid-cols-1 gap-4',
    2: 'gap-4 xl:grid-cols-2',
    3: 'gap-4 lg:grid-cols-2 xl:grid-cols-3',
    4: 'gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={cn('grid', columnClass[columns], className)} {...props}>
      {children}
    </div>
  );
};

export default Grid;
