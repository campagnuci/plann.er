import { isEqual } from 'date-fns'
import { Calendar, MapPin, Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'
import { mergeDatesToString } from '@/utils/merge-dates-to-string'

export interface Trip {
  id: string
  destination: string
  startsAt: string
  endsAt: string
  isConfirmed: boolean
}

export function DestinationAndDateHeader () {
  const { tripId } = useParams()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [trip, setTrip] = useState<Trip>()
  const [newDestination, setNewDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>(undefined)

  const displayedDate = trip ? mergeDatesToString({ from: trip?.startsAt, to: trip?.endsAt }) : null
  const newDisplayedDate = eventStartAndEndDates ? mergeDatesToString(eventStartAndEndDates) : null

  function enableDestinationAndDateEditing () {
    setIsEditing(true)
  }

  function openDatePicker () {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker () {
    setIsDatePickerOpen(false)
  }

  async function editTrip () {
    const areStartDatesEqual = isEqual(eventStartAndEndDates?.from as Date, trip?.startsAt as string)
    const areEndDatesEqual = isEqual(eventStartAndEndDates?.to as Date, trip?.endsAt as string)
    if (newDestination === '' && areStartDatesEqual && areEndDatesEqual) {
      setIsEditing(false)
    }
    if (!newDestination) {
      return
    }
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }
    await api.put(`/trips/${tripId}`, {
      destination: newDestination,
      startsAt: eventStartAndEndDates.from,
      endsAt: eventStartAndEndDates.to,
    })
    setIsEditing(false)
    window.document.location.reload()
  }

  useEffect(() => {
    async function getTrip () {
      const { data } = await api.get(`/trips/${tripId}`)
      setTrip(data.trip)
    }
    if (!trip) {
      getTrip()
    }
    setEventStartAndEndDates({
      from: trip && new Date(trip.startsAt),
      to: trip && new Date(trip.endsAt)
    })
  }, [tripId, trip])

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <Input
          disabled={!isEditing}
          onChange={(event) => setNewDestination(event.target.value)}
          type="text"
          textSize='lg'
          extent='xl'
          value={newDestination.length > 0 ? newDestination : (trip?.destination ?? '')}
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={openDatePicker}
          disabled={!isEditing}
          className='flex items-center gap-2 text-left w-[240px]'
        >
          <Calendar className='size-5 text-zinc-400' />
          <span className="text-lg text-zinc-400 w-40 flex-1">
            {newDisplayedDate ? newDisplayedDate : displayedDate}
          </span>
        </button>
        <div className='w-px h-6 bg-zinc-800' />
        {
          isEditing ? (
            <Button onClick={editTrip}>
              Salvar alterações
              <Settings2 className='size-5 text-zinc-800' />
            </Button>
          ) : (
            <Button onClick={enableDestinationAndDateEditing} variant='secondary'>
              Alterar local e data
              <Settings2 className='size-5 text-zinc-200' />
            </Button>
          )
        }
      </div>
      { isDatePickerOpen && (
        <Modal
          title='Selecione a data'
          size='sm'
          closeButtonAction={closeDatePicker}
        >
          <DayPicker
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
          />
        </Modal>
      )}
    </div>
  )
}
