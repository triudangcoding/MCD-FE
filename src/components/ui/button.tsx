import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
// Remove framer-motion import
// import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:shadow-sm focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 hover:shadow-sm focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:shadow-sm focus-visible:ring-accent/20 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-sm focus-visible:ring-secondary/20",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:shadow-sm focus-visible:ring-accent/20 dark:hover:bg-accent/50",
        link: 
          "text-primary underline-offset-4 hover:underline focus-visible:ring-primary/20",
        
        // Comprehensive Color Variants (based on badge.tsx)
        success:
          "bg-green-500 text-white shadow-xs hover:bg-green-600 hover:shadow-sm focus-visible:ring-green-500/20 dark:bg-green-600 dark:hover:bg-green-700",
        warning:
          "bg-amber-500 text-white shadow-xs hover:bg-amber-600 hover:shadow-sm focus-visible:ring-amber-500/20 dark:bg-amber-600 dark:hover:bg-amber-700",
        info:
          "bg-blue-500 text-white shadow-xs hover:bg-blue-600 hover:shadow-sm focus-visible:ring-blue-500/20 dark:bg-blue-600 dark:hover:bg-blue-700",
        purple:
          "bg-purple-500 text-white shadow-xs hover:bg-purple-600 hover:shadow-sm focus-visible:ring-purple-500/20 dark:bg-purple-600 dark:hover:bg-purple-700",
        pink:
          "bg-pink-500 text-white shadow-xs hover:bg-pink-600 hover:shadow-sm focus-visible:ring-pink-500/20 dark:bg-pink-600 dark:hover:bg-pink-700",
        orange:
          "bg-orange-500 text-white shadow-xs hover:bg-orange-600 hover:shadow-sm focus-visible:ring-orange-500/20 dark:bg-orange-600 dark:hover:bg-orange-700",
        emerald:
          "bg-emerald-500 text-white shadow-xs hover:bg-emerald-600 hover:shadow-sm focus-visible:ring-emerald-500/20 dark:bg-emerald-600 dark:hover:bg-emerald-700",
        cyan:
          "bg-cyan-500 text-white shadow-xs hover:bg-cyan-600 hover:shadow-sm focus-visible:ring-cyan-500/20 dark:bg-cyan-600 dark:hover:bg-cyan-700",
        indigo:
          "bg-indigo-500 text-white shadow-xs hover:bg-indigo-600 hover:shadow-sm focus-visible:ring-indigo-500/20 dark:bg-indigo-600 dark:hover:bg-indigo-700",
        slate:
          "bg-slate-500 text-white shadow-xs hover:bg-slate-600 hover:shadow-sm focus-visible:ring-slate-500/20 dark:bg-slate-600 dark:hover:bg-slate-700",
        gray:
          "bg-gray-500 text-white shadow-xs hover:bg-gray-600 hover:shadow-sm focus-visible:ring-gray-500/20 dark:bg-gray-600 dark:hover:bg-gray-700",
        zinc:
          "bg-zinc-500 text-white shadow-xs hover:bg-zinc-600 hover:shadow-sm focus-visible:ring-zinc-500/20 dark:bg-zinc-600 dark:hover:bg-zinc-700",
        red:
          "bg-red-500 text-white shadow-xs hover:bg-red-600 hover:shadow-sm focus-visible:ring-red-500/20 dark:bg-red-600 dark:hover:bg-red-700",
        rose:
          "bg-rose-500 text-white shadow-xs hover:bg-rose-600 hover:shadow-sm focus-visible:ring-rose-500/20 dark:bg-rose-600 dark:hover:bg-rose-700",
        teal:
          "bg-teal-500 text-white shadow-xs hover:bg-teal-600 hover:shadow-sm focus-visible:ring-teal-500/20 dark:bg-teal-600 dark:hover:bg-teal-700",
        lime:
          "bg-lime-500 text-black shadow-xs hover:bg-lime-600 hover:shadow-sm focus-visible:ring-lime-500/20 dark:bg-lime-600 dark:hover:bg-lime-700 dark:text-white",
        yellow:
          "bg-yellow-500 text-black shadow-xs hover:bg-yellow-600 hover:shadow-sm focus-visible:ring-yellow-500/20 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white",
        
        // Comprehensive Outline Color Variants (based on badge.tsx)
        "outline-success":
          "border border-green-500 bg-background text-green-700 shadow-xs hover:bg-green-50 hover:text-green-800 hover:shadow-sm focus-visible:ring-green-500/20 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950 dark:hover:text-green-300",
        "outline-warning":
          "border border-amber-500 bg-background text-amber-700 shadow-xs hover:bg-amber-50 hover:text-amber-800 hover:shadow-sm focus-visible:ring-amber-500/20 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-950 dark:hover:text-amber-300",
        "outline-info":
          "border border-blue-500 bg-background text-blue-700 shadow-xs hover:bg-blue-50 hover:text-blue-800 hover:shadow-sm focus-visible:ring-blue-500/20 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300",
        "outline-destructive":
          "border border-red-500 bg-background text-red-700 shadow-xs hover:bg-red-50 hover:text-red-800 hover:shadow-sm focus-visible:ring-red-500/20 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300",
        "outline-purple":
          "border border-purple-500 bg-background text-purple-700 shadow-xs hover:bg-purple-50 hover:text-purple-800 hover:shadow-sm focus-visible:ring-purple-500/20 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 dark:hover:text-purple-300",
        "outline-pink":
          "border border-pink-500 bg-background text-pink-700 shadow-xs hover:bg-pink-50 hover:text-pink-800 hover:shadow-sm focus-visible:ring-pink-500/20 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-950 dark:hover:text-pink-300",
        "outline-orange":
          "border border-orange-500 bg-background text-orange-700 shadow-xs hover:bg-orange-50 hover:text-orange-800 hover:shadow-sm focus-visible:ring-orange-500/20 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:text-orange-300",
        "outline-emerald":
          "border border-emerald-500 bg-background text-emerald-700 shadow-xs hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-sm focus-visible:ring-emerald-500/20 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950 dark:hover:text-emerald-300",
        "outline-cyan":
          "border border-cyan-500 bg-background text-cyan-700 shadow-xs hover:bg-cyan-50 hover:text-cyan-800 hover:shadow-sm focus-visible:ring-cyan-500/20 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-950 dark:hover:text-cyan-300",
        "outline-indigo":
          "border border-indigo-500 bg-background text-indigo-700 shadow-xs hover:bg-indigo-50 hover:text-indigo-800 hover:shadow-sm focus-visible:ring-indigo-500/20 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-300",
        "outline-slate":
          "border border-slate-500 bg-background text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm focus-visible:ring-slate-500/20 dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-950 dark:hover:text-slate-300",
        "outline-gray":
          "border border-gray-500 bg-background text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm focus-visible:ring-gray-500/20 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-gray-300",
        "outline-zinc":
          "border border-zinc-500 bg-background text-zinc-700 shadow-xs hover:bg-zinc-50 hover:text-zinc-800 hover:shadow-sm focus-visible:ring-zinc-500/20 dark:border-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-950 dark:hover:text-zinc-300",
        "outline-red":
          "border border-red-500 bg-background text-red-700 shadow-xs hover:bg-red-50 hover:text-red-800 hover:shadow-sm focus-visible:ring-red-500/20 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300",
        "outline-rose":
          "border border-rose-500 bg-background text-rose-700 shadow-xs hover:bg-rose-50 hover:text-rose-800 hover:shadow-sm focus-visible:ring-rose-500/20 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-950 dark:hover:text-rose-300",
        "outline-teal":
          "border border-teal-500 bg-background text-teal-700 shadow-xs hover:bg-teal-50 hover:text-teal-800 hover:shadow-sm focus-visible:ring-teal-500/20 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950 dark:hover:text-teal-300",
        "outline-lime":
          "border border-lime-500 bg-background text-lime-700 shadow-xs hover:bg-lime-50 hover:text-lime-800 hover:shadow-sm focus-visible:ring-lime-500/20 dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-950 dark:hover:text-lime-300",
        "outline-yellow":
          "border border-yellow-500 bg-background text-yellow-700 shadow-xs hover:bg-yellow-50 hover:text-yellow-800 hover:shadow-sm focus-visible:ring-yellow-500/20 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:text-yellow-300",
        
        // Soft variants for subtle backgrounds (based on badge.tsx)
        "soft-success":
          "border-transparent bg-green-100 text-green-800 shadow-xs hover:bg-green-200 hover:shadow-sm focus-visible:ring-green-500/20 dark:bg-green-950 dark:text-green-200 dark:hover:bg-green-900",
        "soft-warning":
          "border-transparent bg-amber-100 text-amber-800 shadow-xs hover:bg-amber-200 hover:shadow-sm focus-visible:ring-amber-500/20 dark:bg-amber-950 dark:text-amber-200 dark:hover:bg-amber-900",
        "soft-info":
          "border-transparent bg-blue-100 text-blue-800 shadow-xs hover:bg-blue-200 hover:shadow-sm focus-visible:ring-blue-500/20 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900",
        "soft-destructive":
          "border-transparent bg-red-100 text-red-800 shadow-xs hover:bg-red-200 hover:shadow-sm focus-visible:ring-red-500/20 dark:bg-red-950 dark:text-red-200 dark:hover:bg-red-900",
        "soft-purple":
          "border-transparent bg-purple-100 text-purple-800 shadow-xs hover:bg-purple-200 hover:shadow-sm focus-visible:ring-purple-500/20 dark:bg-purple-950 dark:text-purple-200 dark:hover:bg-purple-900",
        "soft-pink":
          "border-transparent bg-pink-100 text-pink-800 shadow-xs hover:bg-pink-200 hover:shadow-sm focus-visible:ring-pink-500/20 dark:bg-pink-950 dark:text-pink-200 dark:hover:bg-pink-900",
          // dashed
        "dashed":
          "border-2 border-dashed border-primary bg-background text-primary shadow-xs hover:bg-primary/10 hover:text-primary hover:shadow-sm focus-visible:ring-primary/20 dark:bg-input/30 dark:border-primary dark:hover:bg-input/50",
        "dashed-success":
          "border-2 border-dashed border-green-500 text-green-700 bg-background shadow-xs hover:bg-green-50 hover:text-green-800 hover:shadow-sm focus-visible:ring-green-500/20 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950 dark:hover:text-green-300",
        "dashed-warning":
          "border-2 border-dashed border-amber-500 text-amber-700 bg-background shadow-xs hover:bg-amber-50 hover:text-amber-800 hover:shadow-sm focus-visible:ring-amber-500/20 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-950 dark:hover:text-amber-300",
        "dashed-info":
          "border-2 border-dashed border-blue-500 text-blue-700 bg-background shadow-xs hover:bg-blue-50 hover:text-blue-800 hover:shadow-sm focus-visible:ring-blue-500/20 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300",
        "dashed-destructive":
          "border-2 border-dashed border-red-500 text-red-700 bg-background shadow-xs hover:bg-red-50 hover:text-red-800 hover:shadow-sm focus-visible:ring-red-500/20 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300",
        "dashed-purple":
          "border-2 border-dashed border-purple-500 text-purple-700 bg-background shadow-xs hover:bg-purple-50 hover:text-purple-800 hover:shadow-sm focus-visible:ring-purple-500/20 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 dark:hover:text-purple-300",
        "dashed-pink":
          "border-2 border-dashed border-pink-500 text-pink-700 bg-background shadow-xs hover:bg-pink-50 hover:text-pink-800 hover:shadow-sm focus-visible:ring-pink-500/20 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-950 dark:hover:text-pink-300",
        "dashed-orange":
          "border-2 border-dashed border-orange-500 text-orange-700 bg-background shadow-xs hover:bg-orange-50 hover:text-orange-800 hover:shadow-sm focus-visible:ring-orange-500/20 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:text-orange-300",
        "dashed-emerald":
          "border-2 border-dashed border-emerald-500 text-emerald-700 bg-background shadow-xs hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-sm focus-visible:ring-emerald-500/20 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950 dark:hover:text-emerald-300",
        "dashed-cyan":
          "border-2 border-dashed border-cyan-500 text-cyan-700 bg-background shadow-xs hover:bg-cyan-50 hover:text-cyan-800 hover:shadow-sm focus-visible:ring-cyan-500/20 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-950 dark:hover:text-cyan-300",
        "dashed-indigo":
          "border-2 border-dashed border-indigo-500 text-indigo-700 bg-background shadow-xs hover:bg-indigo-50 hover:text-indigo-800 hover:shadow-sm focus-visible:ring-indigo-500/20 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-300",
        "dashed-slate":
          "border-2 border-dashed border-slate-500 text-slate-700 bg-background shadow-xs hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm focus-visible:ring-slate-500/20 dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-950 dark:hover:text-slate-300",
        "dashed-gray":
          "border-2 border-dashed border-gray-500 text-gray-700 bg-background shadow-xs hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm focus-visible:ring-gray-500/20 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-gray-300",
        "dashed-zinc":
          "border-2 border-dashed border-zinc-500 text-zinc-700 bg-background shadow-xs hover:bg-zinc-50 hover:text-zinc-800 hover:shadow-sm focus-visible:ring-zinc-500/20 dark:border-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-950 dark:hover:text-zinc-300",
        "dashed-red":
          "border-2 border-dashed border-red-500 text-red-700 bg-background shadow-xs hover:bg-red-50 hover:text-red-800 hover:shadow-sm focus-visible:ring-red-500/20 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300",
        "dashed-rose":
          "border-2 border-dashed border-rose-500 text-rose-700 bg-background shadow-xs hover:bg-rose-50 hover:text-rose-800 hover:shadow-sm focus-visible:ring-rose-500/20 dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-950 dark:hover:text-rose-300",
        "dashed-teal":
          "border-2 border-dashed border-teal-500 text-teal-700 bg-background shadow-xs hover:bg-teal-50 hover:text-teal-800 hover:shadow-sm focus-visible:ring-teal-500/20 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950 dark:hover:text-teal-300",
        "dashed-lime":
          "border-2 border-dashed border-lime-500 text-lime-700 bg-background shadow-xs hover:bg-lime-50 hover:text-lime-800 hover:shadow-sm focus-visible:ring-lime-500/20 dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-950 dark:hover:text-lime-300",
        "dashed-yellow":
          "border-2 border-dashed border-yellow-500 text-yellow-700 bg-background shadow-xs hover:bg-yellow-50 hover:text-yellow-800 hover:shadow-sm focus-visible:ring-yellow-500/20 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-950 dark:hover:text-yellow-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-11 rounded-lg px-8 text-base has-[>svg]:px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  form?: string
  name?: string
  value?: string | readonly string[] | number
  tabIndex?: number
  'aria-label'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  children,
  disabled,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  type = "button",
  ...props
}, ref) => {
  if (asChild) {
    return (
      <Slot
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {typeof children === "string" ? "Loading..." : children}
        </>
      ) : (
        children
      )}
    </button>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }