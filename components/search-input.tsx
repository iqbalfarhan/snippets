import type { LucideIcon } from 'lucide-react';
import { Search } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

type Props = ComponentProps<typeof InputGroupInput> & {
  icon?: LucideIcon;
};

const SearchInput: FC<Props> = ({ icon: Icon, placeholder, ...props }) => {
  return (
    <InputGroup className="min-w-xs">
      <InputGroupInput
        type="search"
        placeholder={placeholder ?? 'Pencarian'}
        {...props}
      />
      <InputGroupAddon>{Icon ? <Icon /> : <Search />}</InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
