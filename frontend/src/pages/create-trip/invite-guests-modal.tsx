import { AtSign, Plus, X } from 'lucide-react'
import { FormEvent } from 'react'

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Modal } from '../../components/modal'

interface Props {
  emailsToInvite: string[]
  handleCloseModal: () => void
  handleAddNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  handleRemoveEmailFromInvite: (email: string) => void
}

export function InviteGuestsModal ({ emailsToInvite, handleAddNewEmailToInvite, handleCloseModal, handleRemoveEmailFromInvite }: Props) {
  return (
    <Modal
      title='Selecionar convidados'
      subText='Os convidados irão receber e-mails para confirmar a participação na viagem.'
      closeButtonAction={handleCloseModal}
    >
      <div className="flex flex-wrap gap-2">
        {
          emailsToInvite.map((email) => {
            return (
              <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                <span className='-textzinc-300'>{email}</span>
                <button type='button' onClick={() => handleRemoveEmailFromInvite(email)}><X className='size-4 text-zinc-400' /></button>
              </div>
            )
          })
        }
      </div>
      <div className='w-full h-px bg-zinc-800' />
      <form onSubmit={handleAddNewEmailToInvite} className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
        <div className='px-2 flex items-center flex-1 gap-2'>
          <AtSign className='size-5 text-zinc-400' />
          <Input
            type="email"
            name="email"
            placeholder="Digite o e-mail do convidado"
          />
        </div>
        <Button type='submit'>
          Convidar
          <Plus className='size-5 text-lime-950' />
        </Button>
      </form>
    </Modal>
  )
}
