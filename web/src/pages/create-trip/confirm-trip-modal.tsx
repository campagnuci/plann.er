import { Mail, User, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/button'

interface Props {
  handleCloseModal: () => void
  handleCreateTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal ({ handleCloseModal, handleCreateTrip }: Props) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
            <button onClick={handleCloseModal}><X className='size-5 text-zinc-400' /></button>
          </div>
          <p className='text-sm text-zinc-400'>
            Para concluir a criação da viagem para
            <span className='text-zinc-100 font-semibold'>Florianópolis, Brasil</span> nas datas de
            <span className='text-zinc-100 font-semibold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={handleCreateTrip} className='space-y-3'>
          <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='size-5 text-zinc-400' />
            <input
              type="text"
              name="name"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              placeholder="Seu nome completo"
            />
          </div>
          <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
            <Mail className='size-5 text-zinc-400' />
            <input
              type="email"
              name="email"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              placeholder="Seu e-mail pessoal"
            />
          </div>
          <Button type='submit' size='full'>
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}
