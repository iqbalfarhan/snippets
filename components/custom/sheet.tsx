import {
  Sheet as BaseSheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ComponentProps, FC, ReactNode } from "react";

type Props = ComponentProps<typeof BaseSheet> & {
  title?: string;
  description?: string;
  trigger?: ReactNode;
  footer?: ReactNode;
};

const Sheet: FC<Props> = ({
  title = "Form sheet",
  description = "Form sheet description",
  children,
  trigger,
  footer,
  ...props
}) => {
  const isMobile = useIsMobile();

  return (
    <BaseSheet {...props}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={isMobile ? "bottom" : "right"}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4 overflow-y-auto">{children}</div>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </BaseSheet>
  );
};

export default Sheet;
