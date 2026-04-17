import { useIsMobile } from '@/hooks/use-mobile';
import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type Props = ComponentProps<typeof Button> & {
  label?: string;
  icon?: LucideIcon;
  loading?: boolean;
  responsive?: boolean;
};

const SubmitButton: FC<Props> = ({
  icon: Icon,
  label = 'Submit',
  loading = false,
  responsive = false,
  size,
  ...props
}) => {
  const isMobile = useIsMobile();

  const isIconOnly = responsive && isMobile;
  const resolvedSize = isIconOnly ? 'icon' : (size ?? 'default');

  return (
    <Button size={resolvedSize} disabled={loading} {...props}>
      {loading ? (
        <Spinner />
      ) : Icon ? (
        <Icon className="size-4" />
      ) : (
        <Check className="size-4" />
      )}
      {!isIconOnly && <span>{label}</span>}
    </Button>
  );
};

export default SubmitButton;
