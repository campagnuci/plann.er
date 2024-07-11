import { Calendar, Tag, X } from 'lucide-react'
import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { Input } from '../../components/input'

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

    handleCloseCreateActivityModal()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
            <button onClick={handleCloseCreateActivityModal}><X className='size-5 text-zinc-400' /></button>
          </div>
          <p className='text-sm text-zinc-400'>
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

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
      </div>
    </div>
  )
}
