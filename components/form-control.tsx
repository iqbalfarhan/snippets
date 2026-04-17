import type { FC, PropsWithChildren } from 'react';
import { Field, FieldDescription, FieldLabel } from '../ui/field';

type Props = PropsWithChildren & {
  label?: string;
  hint?: string;
  description?: string;
  className?: string;
  required?: boolean;
};

const FormControl: FC<Props> = ({
  children,
  label,
  hint,
  className,
  description,
  required = false,
}) => {
  return (
    <Field className={className}>
      <FieldLabel>
        <span>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
        <span className="ml-auto text-muted-foreground text-sm">{hint}</span>
      </FieldLabel>
      {children}
      <FieldDescription>{description}</FieldDescription>
    </Field>
  );
};

export default FormControl;
