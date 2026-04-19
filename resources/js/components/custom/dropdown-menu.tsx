import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';

export type AppDropdownMenuLink = {
  label: string;
  href?: string;
  icon?: LucideIcon;
};

type Props = {
  trigger: ReactNode;
  links: AppDropdownMenuLink[];
};

const DropdownMenu: FC<Props> = ({ trigger, links }) => {
  return (
    <BaseDropdownMenu>
      {trigger && <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>}
      <DropdownMenuContent align="end">
        {links.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link href={item.href}>
              {item.icon && <item.icon />} {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </BaseDropdownMenu>
  );
};

export default DropdownMenu;
