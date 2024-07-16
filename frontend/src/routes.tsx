import { createBrowserRouter } from 'react-router-dom'

import { CreateTripPage } from '@/pages/create-trip'
import { TripDetailsPage } from '@/pages/trip-details'
import { NotFound } from './pages/404'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
    errorElement: <NotFound />
  },
  {
    path: '/trip/:tripId',
    element: <TripDetailsPage />
  }
])
