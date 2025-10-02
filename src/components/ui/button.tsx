import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        custom_primary:
          "text-white bg-blue-500 font-black uppercase shadow-[0_.25rem_0_var(--color-blue-600)] transition-none hover:bg-blue-400 active:translate-y-1 active:shadow-none",
        custom_primary_alt:
          "text-blue-400 border-2 border-blue-400 bg-blue-100 font-black uppercase shadow-[0_.25rem_0_var(--color-blue-400)] transition-none active:translate-y-1 active:shadow-none",
        custom_secondary:
          "font-black text-blue-500 uppercase border-2 shadow-[0_.25rem_0_var(--color-neutral-200)] transition-none hover:bg-neutral-100 active:translate-y-1 active:shadow-none",
        custom_tertary:
          "font-black text-neutral-400 bg-white uppercase border-2 shadow-[0_.25rem_0_var(--color-neutral-200)] transition-none hover:bg-neutral-100 active:translate-y-1 active:shadow-none",
        custom_alt:
          "text-white bg-teal-500 font-black uppercase shadow-[0_.25rem_0_var(--color-teal-600)] transition-none hover:bg-teal-400 active:translate-y-1 active:shadow-none",
        custom_danger:
          "text-white bg-red-500 font-black uppercase shadow-[0_.25rem_0_var(--color-red-600)] transition-none hover:bg-red-400 active:translate-y-1 active:shadow-none",
        custom_danger_alt:
          "text-red-400 border-2 border-red-400 bg-red-100 font-black uppercase shadow-[0_.25rem_0_var(--color-red-400)] transition-none active:translate-y-1 active:shadow-none",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        custom: "px-8 min-h-12 rounded-xl",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
