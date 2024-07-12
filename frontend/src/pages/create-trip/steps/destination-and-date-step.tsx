import { format } from 'date-fns'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import "react-day-picker/dist/style.css"

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'

interface Props {
  isGuestInputOpen: boolean
  handleCloseGuestInput: () => void
  handleOpenGuestInput: () => void
  setDestination: (dest: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep ({ isGuestInputOpen, handleCloseGuestInput, handleOpenGuestInput, setDestination, eventStartAndEndDates, setEventStartAndEndDates }: Props) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker () {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker () {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <Input
          disabled={isGuestInputOpen}
          onChange={(event) => setDestination(event.target.value)}
          type="text"
          placeholder="Para onde você vai?"
          textSize='lg'
        />
      </div>
      <button
        onClick={openDatePicker}
        disabled={isGuestInputOpen}
        className='flex items-center gap-2 text-left w-[240px]'
      >
        <Calendar className='size-5 text-zinc-400' />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate ?? 'Quando?'}
        </span>
      </button>

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

      <div className='w-px h-6 bg-zinc-800' />
      {
        isGuestInputOpen ? (
          <Button onClick={handleCloseGuestInput} variant='secondary'>
            Alterar local e data
            <Settings2 className='size-5 text-zinc-200' />
          </Button>
        ) : (
          <Button onClick={handleOpenGuestInput}>
            Continuar
            <ArrowRight className='size-5 text-lime-950' />
          </Button>
        )
      }
    </div>
  )
}
