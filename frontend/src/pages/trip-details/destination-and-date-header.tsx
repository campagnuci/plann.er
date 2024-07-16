import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'date-fns'
import { Calendar, HeartCrack, MapPin, Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { getTrip } from '@/api/get-trip'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'
import { mergeDatesToString } from '@/utils/merge-dates-to-string'

export function DestinationAndDateHeader () {
  const navigate = useNavigate()
  const { tripId } = useParams()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newDestination, setNewDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>(undefined)
  const { isError, data, error } = useQuery({
    queryKey: ['trip'],
    queryFn: () => getTrip({ tripId: tripId as string }),
  })

  const displayedDate = data ? mergeDatesToString({ from: data?.trip?.startsAt, to: data?.trip?.endsAt }) : null
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
    const areStartDatesEqual = isEqual(eventStartAndEndDates?.from as Date, data?.trip?.startsAt as string)
    const areEndDatesEqual = isEqual(eventStartAndEndDates?.to as Date, data?.trip?.endsAt as string)
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
    setEventStartAndEndDates({
      from: data && new Date(data.trip?.startsAt),
      to: data && new Date(data.trip?.endsAt)
    })
  }, [data])

  useEffect(() => {
    if (isError && error) {
      toast.error('Houve um erro', {
        description: 'Não conseguimos encontrar a sua viagem. Por favor tente novamente mais tarde.',
        duration: 5000,
        icon: <HeartCrack />,
        closeButton: true
      })
      navigate('/')
    }
  }, [error, isError, navigate])

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
          value={newDestination.length > 0 ? newDestination : (data?.trip?.destination ?? '')}
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
