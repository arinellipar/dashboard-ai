import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg",
        secondary:
          "border-transparent bg-slate-700 text-slate-100 hover:bg-slate-600",
        destructive:
          "border-transparent bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg",
        outline: "text-slate-100 border-purple-500",
        success:
          "border-transparent bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

