import { api } from '@/lib/axios'

export interface GetTripParams {
  tripId: string
}

export interface GetTripResponse {
  trip: {
    id: string
    destination: string
    startsAt: string
    endsAt: string
    isConfirmed: boolean
  }
}

export async function getTrip ({ tripId }: GetTripParams): Promise<GetTripResponse> {
  const response = await api.get(`/trips/${tripId}`)
  return response.data
}
