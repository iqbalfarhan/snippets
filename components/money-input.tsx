import { cn, formatRupiah, parseRupiah } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { useCallback, useRef, useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

type MoneyInputProps = ComponentProps<typeof InputGroupInput> & {
  value: number;
  onValueChange: (value: number) => void;
  id?: string;
  name?: string;
  min?: number;
  max?: number;
};

const MoneyInput = ({
  value,
  onValueChange,
  placeholder = '0',
  disabled = false,
  id,
  name,
  min,
  max,
}: MoneyInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [rawValue, setRawValue] = useState('');

  // Derived — no useEffect needed
  const displayValue = isFocused ? rawValue : formatRupiah(value);

  const handleFocus = useCallback(() => {
    setRawValue(value ? String(value) : '');
    setIsFocused(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    const numeric = parseRupiah(rawValue);

    const clamped = Math.min(
      max ?? Infinity,
      Math.max(min ?? -Infinity, numeric),
    );

    onValueChange(clamped);
  }, [rawValue, min, max, onValueChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d]/g, '');
      setRawValue(raw);
      onValueChange(parseRupiah(raw));
    },
    [onValueChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        inputRef.current?.blur();
      }

      const allowed = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Backspace',
        'Delete',
        'Tab',
        'Home',
        'End',
      ];

      if (allowed.includes(e.key)) {
        return;
      }

      // Block non-numeric input
      if (!/[\d.,]/.test(e.key) && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
      }
    },
    [],
  );

  return (
    <InputGroup>
      <InputGroupAddon>Rp</InputGroupAddon>
      {/* Number input */}
      <InputGroupInput
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        disabled={disabled}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn('font-mono tabular-nums')}
      />
    </InputGroup>
  );
};

export default MoneyInput;
