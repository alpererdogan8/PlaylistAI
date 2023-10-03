import React from "react";
import { Button as ShadcnButton, ButtonProps, buttonVariants } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TButton = {
  type: "button" | "submit" | "reset";
  disabled: boolean;
  className: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
};

const Button: React.FC<TButton> = ({ className, disabled, type, children, isLoading, onClick }) => {
  if (isLoading) {
    return (
      <ShadcnButton className={cn(className, "animate-pulse")} disabled>
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </ShadcnButton>
    );
  }
  return (
    <ShadcnButton onClick={onClick} type={type} disabled={disabled} className={className} {...buttonVariants}>
      {children}
    </ShadcnButton>
  );
};
export default Button;
