import { CalendarX2, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { api } from '@/lib/axios'
import { Trip } from './destination-and-date-header'
import { Input } from '@/components/input'

export function DeleteTrip () {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const [destinationToRemove, setDestinationToRemove] = useState('')
  const [trip, setTrip] = useState<Trip>()

  const doDestinationsMatch = destinationToRemove === trip?.destination

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

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])


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
            subText={`Para confirmar insira o seguinte texto: "${trip?.destination}"`}
            closeButtonAction={closeConfirmDeleteModal}
          >
            <div className='space-y-3'>
              <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                <MapPin className='size-5 text-zinc-400' />
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
