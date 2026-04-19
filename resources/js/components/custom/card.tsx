import { cn } from '@/lib/utils';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';
import {
  Card as BaseCard,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type Props = ComponentProps<typeof BaseCard> &
  PropsWithChildren & {
    title?: string;
    description?: string;
    action?: ReactNode;
    footer?: ReactNode;
    borderHeader?: boolean;
  };

const Card: FC<Props> = ({
  children,
  title = 'Card title',
  description = 'Description of this card',
  borderHeader = false,
  action,
  footer,
  ...props
}) => {
  return (
    <BaseCard {...props}>
      <CardHeader className={cn(borderHeader && 'border-b')}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </BaseCard>
  );
};

export default Card;
