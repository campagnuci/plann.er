import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, CircleDashed, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { getGuests } from '@/api/get-guests'
import { Button } from '@/components/button'
import { InviteGuestModal } from './modals/invite-guest-modal'

export function Guests () {
  const { tripId } = useParams()
  const [isInviteNewGuestModalOpen, setIsInviteNewGuestModalOpen] = useState(false)
  const { data } = useQuery({
    queryKey: ['participants'],
    queryFn: () => getGuests({ tripId: tripId as string }),
  })

  function openInviteNewGuestModal () {
    setIsInviteNewGuestModalOpen(true)
  }

  function closeInviteNewGuestModal () {
    setIsInviteNewGuestModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {
          data && data.participants.map((participant, index) => {
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
      <Button onClick={openInviteNewGuestModal} variant='secondary' size='full'>
        <UserPlus className='size-5 text-zinc-200' />
        Adicionar Convidado
      </Button>

      {
        isInviteNewGuestModalOpen && (
          <InviteGuestModal handleCloseModal={closeInviteNewGuestModal} />
        )
      }
    </div>
  )
}
