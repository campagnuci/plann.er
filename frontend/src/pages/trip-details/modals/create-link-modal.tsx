import { Link, Tag } from 'lucide-react'
import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'

interface Props {
  handleCloseModal: () => void
}

export function CreateLinkModal ({ handleCloseModal }: Props) {
  const { tripId } = useParams()

  async function createLink (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.post(`/trips/${tripId}/links`, { title, url })
    // handleCloseModal()
    window.document.location.reload()
  }

  return (
    <Modal
      title='Cadastrar link'
      subText='Use este espaço para compartilhar links importantes para a viagem.'
      closeButtonAction={handleCloseModal}
    >
      <form onSubmit={createLink} className='space-y-3'>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
          <Tag className='size-5 text-zinc-400' />
          <Input type="text" name="title" placeholder="Qual o link" />
        </div>
        <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex flex-1 items-center gap-2'>
          <Link className='size-5 text-zinc-400' />
          <Input type="url" name="url" placeholder="Insira o link" />
        </div>
        <Button type='submit' size='full'>
          Salvar link
        </Button>
      </form>
    </Modal>
  )
}
