import { api } from '@/lib/axios'

export interface GetLinksParams {
  tripId: string
}

export interface GetLinksResponse {
  links: Array<{
    id: string
    title: string
    url: string
    tripId: string
  }>
}

export async function getLinks ({ tripId }: GetLinksParams): Promise<GetLinksResponse> {
  const response = await api.get(`/trips/${tripId}/links`)
  return response.data
}
