import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';
import {
  Item as BaseItem,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';

type Props = ComponentProps<typeof BaseItem> & {
  icon?: LucideIcon;
  title?: string;
  src?: string;
  description?: string;
  href?: string;
  actions?: ReactNode;
  descriptionClassName?: string;
};

const Item: FC<Props> = ({
  icon: Icon,
  title,
  src,
  description,
  href,
  variant = 'muted',
  actions,
  ...props
}) => {
  const content = (
    <>
      {src && (
        <ItemMedia variant="image">
          <img src={src} alt={title} />
        </ItemMedia>
      )}
      {Icon && (
        <ItemMedia variant="icon">
          <Icon />
        </ItemMedia>
      )}
      <ItemContent>
        <ItemTitle className="line-clamp-1">{title}</ItemTitle>
        <ItemDescription
          className={cn('line-clamp-1', props.descriptionClassName)}
        >
          {description}
        </ItemDescription>
      </ItemContent>
      {actions && <ItemActions>{actions}</ItemActions>}
    </>
  );

  if (href) {
    return (
      <BaseItem {...props} variant={variant} asChild>
        <Link href={href} preserveScroll>
          {content}
        </Link>
      </BaseItem>
    );
  }

  return (
    <BaseItem {...props} variant={variant}>
      {content}
    </BaseItem>
  );
};

export default Item;
