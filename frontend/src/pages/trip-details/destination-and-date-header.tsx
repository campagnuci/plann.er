import { format } from 'date-fns'
import { Calendar, MapPin, Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

export interface Trip {
  id: string
  destination: string
  startsAt: string
  endsAt: string
  isConfirmed: boolean
}

export function DestinationAndDateHeader () {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip>()

  const displayedDate = trip ? format(trip.startsAt, "d' de 'LLL").concat(' até ').concat(format(trip.endsAt, "d' de 'LLL")) : null

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className='w-px h-6 bg-zinc-800' />
        <Button variant='secondary'>
          Alterar local e data
          <Settings2 className='size-5 text-zinc-200' />
        </Button>
      </div>
    </div>
  )
}
