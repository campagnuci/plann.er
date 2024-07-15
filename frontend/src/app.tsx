import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { CreateTripPage } from "@/pages/create-trip"
import { TripDetailsPage } from "@/pages/trip-details"
import { queryClient } from "./lib/query"

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />
  },
  {
    path: '/trip/:tripId',
    element: <TripDetailsPage />
  }
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  )
}
