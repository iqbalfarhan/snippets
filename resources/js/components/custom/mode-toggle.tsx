import type { Appearance } from "@/hooks/use-appearance";
import { useAppearance } from "@/hooks/use-appearance";
import type { LucideIcon } from "lucide-react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const themes: {
  label: string;
  value: Appearance;
  icon: LucideIcon;
}[] = [
  {
    label: "Terang",
    value: "light",
    icon: Sun,
  },
  {
    label: "Gelap",
    value: "dark",
    icon: Moon,
  },
  {
    label: "Perangkat",
    value: "system",
    icon: Monitor,
  },
];

const ModeToggle = () => {
  const { appearance, updateAppearance } = useAppearance();

  const current = themes.find((d) => d.value === appearance) ?? themes[2];
  const CurrentIcon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <CurrentIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem onSelect={() => updateAppearance(theme.value)}>
            <theme.icon /> {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
