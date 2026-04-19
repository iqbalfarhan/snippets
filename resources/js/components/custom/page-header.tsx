import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren, ReactNode } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title?: string;
  description?: string;
  action?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

const PageHeader: FC<Props> = ({
  title = "Dashboard",
  description = "Description about this page",
  action,
  left,
  right,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-sidebar border-0">
      <CardHeader className={!action ? "border-b" : ""}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      {(left || right) && (
        <CardFooter
          className={cn(
            "overflow-x-auto gap-2",
            isMobile ? "" : "justify-between",
          )}
        >
          {left && <div className="flex gap-2">{left}</div>}
          {right && <div className="flex gap-2">{right}</div>}
        </CardFooter>
      )}
    </Card>
  );
};

export default PageHeader;
