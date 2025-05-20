import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#eab620] text-[#500000] hover:bg-[#f8c632] shadow-md hover:shadow-lg active:scale-95",
        destructive: "bg-[#dc2626] text-white hover:bg-[#ef4444] shadow-md hover:shadow-lg active:scale-95",
        outline: "border-2 border-[#eab620] bg-transparent text-[#500000] hover:bg-[#eab620]/20 hover:border-[#f8c632]",
        secondary: "bg-[#500000] text-white hover:bg-[#300000] shadow-md hover:shadow-lg active:scale-95",
        ghost: "text-[#500000] hover:bg-[#eab620]/20 hover:text-[#500000]",
        link: "text-[#eab620] underline-offset-4 hover:underline hover:text-[#f8c632]",
        food: "bg-gradient-to-r from-[#eab620] to-[#f8c632] text-[#500000] hover:from-[#f8c632] hover:to-[#ffd966] shadow-md hover:shadow-lg active:scale-95 font-semibold",
        foodOutline: "border-2 border-[#eab620] bg-transparent text-[#500000] hover:bg-[#eab620]/10 hover:border-[#f8c632]",
      },
      size: {
        default: "h-10 px-6 py-2 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }