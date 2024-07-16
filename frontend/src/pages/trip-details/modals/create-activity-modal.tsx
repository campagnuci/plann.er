import { Calendar, Tag } from 'lucide-react'
import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'

interface Props {
  handleCloseCreateActivityModal: () => void
}

export function CreateActivityModal ({ handleCloseCreateActivityModal }: Props) {
  const { tripId } = useParams()

  async function createActivity (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const occursAt = data.get('occursAt')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occursAt,
    })

    // handleCloseCreateActivityModal()
    window.document.location.reload()
  }

  return (
    <Modal
      title='Cadastrar atividade'
      subText='Todos convidados podem visualizar as atividades.'
      closeButtonAction={handleCloseCreateActivityModal}
    >
      <form onSubmit={createActivity} className='space-y-3'>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
          <Tag className='size-5 text-zinc-400' />
          <Input type="text" name="title" placeholder="Qual a atividade" />
        </div>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex flex-1 items-center gap-2'>
          <Calendar className='size-5 text-zinc-400' />
          <Input
            type="datetime-local"
            name="occursAt"
            colorScheme="dark"
            placeholder="Data e horário da atividade"
          />
        </div>
        <Button type='submit' size='full'>
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}
