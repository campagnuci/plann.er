import { Link2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { api } from '@/lib/axios'
import { CreateLinkModal } from './create-link-modal'

interface Link {
  id: string
  title: string
  url: string
  tripId: string
}

export function ImportantLinks () {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isCreateNewLinkModalOpen, setIsCreateNewLinkModalOpen] = useState(false)

  function openCreateNewLinkModal () {
    setIsCreateNewLinkModalOpen(true)
  }

  function closeCreateNewLinkModal () {
    setIsCreateNewLinkModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        { links.length === 0 ? <span className='font-medium text-zinc-400'>Ainda não há links cadastrados.</span> : null }
        {
          links && links.map((link) => {
            return (
              <div key={link.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{link.title}</span>
                  <a
                    href={link.url}
                    className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 shrink-0" />
              </div>
            )
          })
        }
      </div>
      <Button onClick={openCreateNewLinkModal} variant='secondary' size='full'>
        <Plus className='size-5 text-zinc-200' />
        Cadastrar novo link
      </Button>

      {
        isCreateNewLinkModalOpen && (
          <CreateLinkModal handleCloseModal={closeCreateNewLinkModal} />
        )
      }
    </div>
  )
}
