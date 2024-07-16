import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { queryClient } from "./lib/query"
import { router } from "./routes"

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  )
}
