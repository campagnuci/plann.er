import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { api } from '@/lib/axios'

interface Participant {
  id: string
  name: string | undefined
  email: string
  isConfirmed: boolean
}

export function Guests () {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {
          participants && participants.map((participant, index) => {
            return (
              <div key={participant.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado #${index}`}</span>
                  <span className="block text-xs text-zinc-400 truncate">{participant.email}</span>
                </div>
                { participant.isConfirmed ? <CheckCircle2 className="size-5 text-zinc-400 shrink-0" /> : <CircleDashed className="size-5 text-zinc-400 shrink-0" /> }
              </div>
            )
          })
        }
      </div>
      <Button variant='secondary' size='full'>
        <UserCog className='size-5 text-zinc-200' />
        Gerenciar Convidados
      </Button>
    </div>
  )
}
