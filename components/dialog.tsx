import {
  Dialog as BaseDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ComponentProps, FC, ReactNode } from 'react';
import CloseButton from './close-button';
import SubmitButton from './submit-button';

type Props = ComponentProps<typeof BaseDialog> & {
  title?: string;
  description?: string;
  loading?: boolean;
  onSubmit?: () => void;
  trigger?: ReactNode;
};

const Dialog: FC<Props> = ({
  title = 'Form dialog',
  description = 'Form dialog description',
  children,
  trigger,
  loading = false,
  onSubmit,
  ...props
}) => {
  return (
    <BaseDialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 overflow-y-auto">{children}</div>
        <DialogFooter>
          <CloseButton />
          {!!onSubmit && <SubmitButton onClick={onSubmit} loading={loading} />}
        </DialogFooter>
      </DialogContent>
    </BaseDialog>
  );
};

export default Dialog;
