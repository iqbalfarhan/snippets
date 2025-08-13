import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { Label } from './ui/label';

type FormControlProps = PropsWithChildren & {
  label?: string;
  hint?: string;
  className?: string;
  required?: boolean;
};

const FormControl = ({ label, children, className, required, hint }: FormControlProps) => {
  return (
    <Label className={cn('flex flex-col space-y-2', className)}>
      {label && (
        <label>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="flex gap-1 text-xs text-muted-foreground">{hint}</p>}
    </Label>
  );
};

export default FormControl;
