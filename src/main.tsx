import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { router } from './router'
import { ThemeProvider } from './providers/theme-provider'
import { PreloaderProvider } from './contexts/PreloaderContext'
import { Toaster } from "@/components/custom/sonner"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
const AppWithRouter = () => (
  <PreloaderProvider>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </PreloaderProvider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="nailism_theme">
          <AppWithRouter />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
  