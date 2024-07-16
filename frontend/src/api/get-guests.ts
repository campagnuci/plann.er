import { api } from '@/lib/axios'

export interface GetGuestsParams {
  tripId: string
}

export interface GetGuestsResponse {
  participants: Array<{
    id: string
    name: string | undefined
    email: string
    isConfirmed: boolean
  }>
}

export async function getGuests ({ tripId }: GetGuestsParams): Promise<GetGuestsResponse> {
  const response = await api.get(`/trips/${tripId}/participants`)
  return response.data
}
