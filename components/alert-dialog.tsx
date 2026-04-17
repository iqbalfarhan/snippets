import SubmitButton from '@/components/submit-button';
import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import type { ComponentProps, FC, ReactNode } from 'react';

type Props = ComponentProps<typeof BaseAlertDialog> & {
  title?: string;
  description?: string;
  loading?: boolean;
  onSubmit?: () => void;
  trigger?: ReactNode;
};

const AlertDialog: FC<Props> = ({
  title = 'Form dialog',
  description = 'Form dialog description',
  trigger,
  loading = false,
  onSubmit,
  ...props
}) => {
  return (
    <BaseAlertDialog {...props}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              onClick={onSubmit}
              label="Lanjutkan"
              loading={loading}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
};

export default AlertDialog;
