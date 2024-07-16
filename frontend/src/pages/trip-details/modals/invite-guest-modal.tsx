import { AtSign, Plus } from 'lucide-react'
import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'

interface Props {
  handleCloseModal: () => void
}

export function InviteGuestModal ({ handleCloseModal }: Props) {
  const { tripId } = useParams()

  async function inviteGuest (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    await api.post(`/trips/${tripId}/invites`, { email })

    // handleCloseModal()
    window.document.location.reload()
  }

  return (
    <Modal
      title='Gerenciar Convidados'
      subText='O convidado receberá um e-mail para confirmar a participação na viagem.'
      closeButtonAction={handleCloseModal}
    >
      <form onSubmit={inviteGuest} className='space-y-3'>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
          <AtSign className='size-5 text-zinc-400' />
          <Input type="email" name="email" placeholder="Digite o e-mail do convidado" />
        </div>
        <Button type='submit' size='full'>
          Convidar
          <Plus className='size-5 text-lime-950' />
        </Button>
      </form>
    </Modal>
  )
}
