import type * as React from "react";
import { cn } from "~/lib/utils";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  variant?: "default" | "transparent" | "colored";
}

const navbarVariants = {
  default: "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
  transparent: "bg-transparent",
  colored: "bg-gray-100 dark:bg-amber-900",
};

export function Navbar({ 
  children, 
  className, 
  sticky = true, 
  variant = "default" 
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 shadow-sm",
        sticky && "sticky top-0 z-10",
        navbarVariants[variant],
        className
      )}
    >
      {children}
    </nav>
  );
}

interface NavbarBrandProps {
  children: React.ReactNode;
  className?: string;
}

export function NavbarBrand({ children, className }: NavbarBrandProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {children}
    </div>
  );
}

interface NavbarActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function NavbarActions({ children, className }: NavbarActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  );
}

interface NavbarTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function NavbarTitle({ children, className }: NavbarTitleProps) {
  return (
    <h1 className={cn("text-2xl font-bold text-gray-900 dark:text-gray-100", className)}>
      {children}
    </h1>
  );
}
