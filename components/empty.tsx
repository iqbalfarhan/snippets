import {
  Empty as BaseEmpty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { cn } from '@/lib/utils';
import { Ban } from 'lucide-react';
import type { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
  icon?: string;
}>;

const Empty: FC<Props> = ({
  children,
  title = 'Belum ada data',
  description = 'Saat ini belum ada data yang tersedia. refresh halaman atau coba lagi nanti.',
  className,
  icon: Icon,
}) => {
  return (
    <BaseEmpty className={cn(className)}>
      <EmptyHeader>
        <EmptyMedia variant={'icon'}>{Icon ? <Icon /> : <Ban />}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </BaseEmpty>
  );
};

export default Empty;
