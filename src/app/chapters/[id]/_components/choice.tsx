import { Button } from "@/components/ui/button";
import React from "react";

export function Choice({
  marked,
  incorrect,
  disabled,
  onClick,
  children,
}: {
  marked: boolean;
  incorrect: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      disabled={disabled}
      variant={
        incorrect
          ? "custom_danger_alt"
          : marked
            ? "custom_primary_alt"
            : "custom_tertary"
      }
      size="custom"
      className="min-h-16 w-full text-lg !text-wrap sm:text-xl"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
