import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps, toast } from "sonner"
import { CheckCircle, AlertTriangle, Info, ShieldXIcon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "group toast bg-card text-foreground border border-border shadow-lg rounded-md p-4 w-full max-w-sm font-sans",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground px-3 py-2 rounded text-sm font-medium",
          cancelButton: "bg-muted text-muted-foreground px-3 py-2 rounded text-sm font-medium",
        },
      }}
      {...props}
    />
  )
}

// Custom toast functions with icons and types
export const customSonnerToast = {
  success: (description?: string) => {
    return toast(
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-500 flex-shrink-0" />
        <div className="flex-1">
          {description && (
            <div className="text-sm text-foreground">
              {description}
            </div>
          )}
        </div>
      </div>,
      {
        classNames: {
          toast: "!bg-card group toast text-foreground shadow-sm rounded-md p-4 w-full max-w-sm font-sans dark:!bg-card",
        },
      }
    )
  },

  error: (description?: string) => {
    return toast(
      <div className="flex items-center gap-3">
        <ShieldXIcon className="w-5 h-5 text-red-500 dark:text-red-500 flex-shrink-0" />
        <div className="flex-1">
          {description && (
            <div className="text-sm text-foreground">
              {description}
            </div>
          )}
        </div>
      </div>,
      {
        classNames: {
          toast: "!bg-card group toast text-foreground shadow-sm rounded-md p-4 w-full max-w-sm font-sans dark:!bg-card",
        },
      }
    )
  },

  warning: (description?: string) => {
    return toast(
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-500 flex-shrink-0" />
        <div className="flex-1">
          {description && (
            <div className="text-sm text-foreground">
              {description}
            </div>
          )}
        </div>
      </div>,
      {
        classNames: {
          toast: "!bg-card group toast text-foreground shadow-sm rounded-md p-4 w-full max-w-sm font-sans dark:!bg-card",
        },
      }
    )
  },

  info: (description?: string) => {
    return toast(
      <div className="flex items-center gap-3">
        <Info className="w-5 h-5 text-sky-500 dark:text-sky-500 flex-shrink-0" />
        <div className="flex-1">
          {description && (
            <div className="text-sm text-foreground">
              {description}
            </div>
          )}
        </div>
      </div>,
      {
        classNames: {
          toast: "!bg-card group toast text-foreground shadow-sm rounded-md p-4 w-full max-w-sm font-sans dark:!bg-card",
        },
      }
    )
  },

  // Direct access to original sonner functions
  promise: toast.promise,
  loading: toast.loading,
  dismiss: toast.dismiss,
  message: toast.message,
}

export { Toaster }
