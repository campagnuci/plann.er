import { api } from '@/lib/axios'

export interface GetActivitiesParams {
  tripId: string
}

export interface GetActivitiesResponse {
  activities: Array<{
    date: string
    activities: Array<{
      id: string
      title: string
      occursAt: string
    }>
  }>
}

export async function getActivities ({ tripId }: GetActivitiesParams): Promise<GetActivitiesResponse> {
  const response = await api.get(`/trips/${tripId}/activities`)
  return response.data
}
