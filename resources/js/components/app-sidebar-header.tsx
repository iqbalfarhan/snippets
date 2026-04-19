import { Breadcrumbs } from "@/components/breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types";
import { Item, ItemActions, ItemContent, ItemMedia } from "./ui/item";
import ModeToggle from "./custom/mode-toggle";

export function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[];
}) {
  return (
    <Item>
      <ItemMedia>
        <SidebarTrigger />
      </ItemMedia>
      <ItemContent>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </ItemContent>
      <ItemActions>
        <ModeToggle />
      </ItemActions>
    </Item>
  );
}
