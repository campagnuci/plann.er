import { Mail, User } from 'lucide-react'
import { FormEvent } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { mergeDatesToString } from '@/utils/merge-dates-to-string'

interface Props {
  handleCloseModal: () => void
  handleCreateTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  destination: string
  selectedDate: DateRange | undefined
}

export function ConfirmTripModal ({ handleCloseModal, handleCreateTrip, setOwnerName, setOwnerEmail, destination, selectedDate }: Props) {
  const displayedDate = selectedDate ? mergeDatesToString(selectedDate) : null

  return (
    <Modal
      title='Confirmar criação de viagem'
      subText={
        <>
          Para concluir a criação da viagem para
          <span className='text-zinc-100 font-semibold'>{` ${destination} `}</span>nas datas de
          <span className='text-zinc-100 font-semibold'>{` ${displayedDate} `}</span>preencha seus dados abaixo:
        </>
      }
      closeButtonAction={handleCloseModal}
    >
      <form onSubmit={handleCreateTrip} className='space-y-3'>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
          <User className='size-5 text-zinc-400' />
          <Input
            name="name"
            placeholder="Seu nome completo"
            onChange={(event) => setOwnerName(event.target.value)}
          />
        </div>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
          <Mail className='size-5 text-zinc-400' />
          <Input
            type="email"
            name="email"
            placeholder="Seu e-mail pessoal"
            onChange={(event) => setOwnerEmail(event.target.value)}
          />
        </div>
        <Button type='submit' size='full'>
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}
