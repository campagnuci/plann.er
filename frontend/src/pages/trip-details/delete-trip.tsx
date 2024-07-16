import { useQuery } from '@tanstack/react-query'
import { CalendarX2, Type } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getTrip } from '@/api/get-trip'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'

export function DeleteTrip () {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const [destinationToRemove, setDestinationToRemove] = useState('')
  const { data } = useQuery({
    queryKey: ['trip'],
    queryFn: () => getTrip({ tripId: tripId as string }),
  })

  const doDestinationsMatch = destinationToRemove === data?.trip.destination

  function openConfirmDeleteModal () {
    setIsConfirmDeleteModalOpen(true)
  }

  function closeConfirmDeleteModal () {
    setIsConfirmDeleteModalOpen(false)
  }

  async function deleteTrip () {
    await api.delete(`/trips/${tripId}`)
    navigate('/')
  }

  return (
    <div className="space-y-6">
      <Button onClick={openConfirmDeleteModal} variant='danger' size='full'>
        <CalendarX2 className='size-5 text-zinc-200' />
        Cancelar Viagem
      </Button>

      {
        isConfirmDeleteModalOpen && (
          <Modal
            title='Tem certeza que deseja cancelar a viagem?'
            subText={`Para confirmar insira o seguinte texto: "${data?.trip?.destination}"`}
            closeButtonAction={closeConfirmDeleteModal}
          >
            <div className='space-y-3'>
              <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                <Type className='size-5 text-zinc-400' />
                <Input
                  onChange={(event) => setDestinationToRemove(event.target.value)}
                  type="text"
                  name="destination"
                  placeholder="Insira o texto solicitado"
                />
              </div>
              <Button
                size='full'
                onClick={deleteTrip}
                disabled={!doDestinationsMatch}
                variant={doDestinationsMatch ? 'primary' : 'disabled'}
              >
                Confirmar cancelamento
              </Button>
            </div>
          </Modal>
        )
      }
    </div>
  )
}
