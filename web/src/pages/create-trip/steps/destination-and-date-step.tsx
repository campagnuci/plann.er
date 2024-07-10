import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { Button } from '../../../components/button'

interface Props {
  isGuestInputOpen: boolean
  handleCloseGuestInput: () => void
  handleOpenGuestInput: () => void
}

export function DestinationAndDateStep ({ isGuestInputOpen, handleCloseGuestInput, handleOpenGuestInput }: Props) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <input
          disabled={isGuestInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
        />
      </div>
      <div className='flex items-center gap-2'>
        <Calendar className='size-5 text-zinc-400' />
        <input
          disabled={isGuestInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none w-40"
          type="text"
          placeholder="Quando?"
        />
      </div>
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
