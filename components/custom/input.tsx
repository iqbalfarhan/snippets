import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

type Props = ComponentProps<typeof InputGroupInput> & {
  icon?: LucideIcon;
};

const Input: FC<Props> = ({ icon: Icon, ...props }) => {
  return (
    <InputGroup>
      <InputGroupInput {...props} />
      {Icon && (
        <InputGroupAddon>
          <Icon />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default Input;
