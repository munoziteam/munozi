import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

// Define text variants with cva
const textVariants = cva("transition-colors focus-visible:outline-none", {
  variants: {
    size: {
      default: "text-sm font-barlow",
      subHeader: "font-semibold text-xs font-gordita",
      header: " text-sm  font-gordita",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// Define the props for the Text component
export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

// Create the Text component
const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(textVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {props.children}
      </Comp>
    );
  }
);

Text.displayName = "Text";

export default Text;
