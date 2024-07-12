import { FormEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'

import { api } from '../../lib/axios'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage () {
  const navigate = useNavigate()
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  function openGuestInput () {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput () {
    setIsGuestInputOpen(false)
  }

  function openGuestsModal () {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal () {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal () {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal () {
    setIsConfirmTripModalOpen(false)
  }

  async function handleCreateTrip (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const { data } = await api.post('/trips', {
      destination,
      startsAt: eventStartAndEndDates.from,
      endsAt: eventStartAndEndDates.to,
      emailsToInvite,
      ownerName,
      ownerEmail
    })
    const { tripId } = data

    navigate(`/trip/${tripId}`)
  }

  function addNewEmailToInvite (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])
    event.currentTarget.reset()
  }

  function removeEmailFromInvite (emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(invited => invited != emailToRemove)
    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxia viagem!</p>
        </div>
        <div className='space-y-4'>
          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            handleCloseGuestInput={closeGuestInput}
            handleOpenGuestInput={openGuestInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          {
            isGuestInputOpen && (
              <InviteGuestsStep
                handleOpenGuestModal={openGuestsModal}
                handleOpenConfirmTripModal={openConfirmTripModal}
                emailsToInvite={emailsToInvite}
              />
            )
          }
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {
        isGuestsModalOpen && (
          <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            handleCloseModal={closeGuestsModal}
            handleAddNewEmailToInvite={addNewEmailToInvite}
            handleRemoveEmailFromInvite={removeEmailFromInvite}
          />
        )
      }
      {
        isConfirmTripModalOpen && (
          <ConfirmTripModal
            handleCloseModal={closeConfirmTripModal}
            handleCreateTrip={handleCreateTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )
      }
    </div>
  )
}
