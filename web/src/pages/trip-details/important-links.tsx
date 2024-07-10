import { Link2, Plus } from 'lucide-react'
import { Button } from '../../components/button'

export function ImportantLinks () {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do Airbnb</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">https://airbnb.com/rooms/20937509238502938502380293230982309</a>
          </div>
          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Regras da casa</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">https://notion.com/pages/0934802374289378019741972</a>
          </div>
          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>
      <Button variant='secondary' size='full'>
        <Plus className='size-5 text-zinc-200' />
        Cadastrar novo link
      </Button>
    </div>
  )
}
