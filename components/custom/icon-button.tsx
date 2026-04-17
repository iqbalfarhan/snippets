import type { LucideIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { Button } from "../ui/button";

type Props = ComponentProps<typeof Button> & {
  icon: LucideIcon;
};

const IconButton: FC<Props> = ({
  icon: Icon,
  variant = "default",
  ...props
}) => {
  return (
    <Button size={props.size ?? "icon"} variant={variant} {...props}>
      <Icon />
    </Button>
  );
};

export default IconButton;
