import { useState, type FC } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { Home, Laptop, List, Moon, Newspaper, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface GlobalMenuProps {
  className?: string;
}

export const GlobalMenu: FC<GlobalMenuProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="size-13 justify-center rounded-2xl cursor-pointer flex items-center bg-gray-500 h-13 w-13 focus-visible:ring-0 ring-0 focus:ring-0 focus-visible:border-none outline-none">
          <List className="text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("", className)}>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleClick}
          className="w-full cursor-pointer p-0"
        >
          <Link
            to="/yc-hackernews"
            className="px-2 py-1.5 w-full flex items-center gap-2"
          >
            <Home />
            <span>Home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClick}
          className="w-full cursor-pointer p-0"
        >
          <Link
            to="/yc-hackernews/news"
            className="px-2 py-1.5 w-full flex items-center gap-2"
          >
            <Newspaper />
            <span>News</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem onClick={handleTheme} className="cursor-pointer">
          {theme === "dark" ? (
            <div className="flex items-center gap-2">
              <Moon />
              <span>Dark</span>
            </div>
          ) : theme === "light" ? (
            <div className="flex items-center gap-2">
              <Sun />
              <span>Light</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Laptop />
              <span>System</span>
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
