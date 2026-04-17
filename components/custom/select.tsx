import type { ComponentProps, FC } from 'react';
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type SelectOption = { value: string; label: string };

type Props = ComponentProps<typeof BaseSelect> & {
  options?: string[] | SelectOption[];
  placeholder?: string;
};

const normalizeOptions = (
  options: string[] | SelectOption[],
): SelectOption[] => {
  if (options.length === 0) {
    return [];
  }

  return typeof options[0] === 'string'
    ? (options as string[]).map((opt) => ({ value: opt, label: opt }))
    : (options as SelectOption[]);
};

const Select: FC<Props> = ({
  options = [],
  placeholder = 'Pilih',
  ...props
}) => {
  const normalized = normalizeOptions(options);

  return (
    <BaseSelect {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {normalized.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
};

export default Select;
