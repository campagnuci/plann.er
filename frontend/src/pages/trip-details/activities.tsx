import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CircleCheck } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { getActivities } from '@/api/get-activities'
import { humanizeWeekDay } from '@/utils/humanize-week-day'

export function Activities () {
  const { tripId } = useParams()
  const { data } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities({ tripId: tripId as string }),
  })

  return (
    <div className="space-y-8">
      {data && data.activities.map((occurrence) => {
        return (
          <div key={occurrence.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">Dia {format(occurrence.date, 'd')}</span>
              <span className="text-xs text-zinc-500">{humanizeWeekDay(occurrence.date)}</span>
            </div>
            {
              occurrence.activities.length > 0 ? (
                <>
                  { occurrence.activities.map((activity) => {
                    return (
                      <div key={activity.id} className="space-y-2.5">
                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                          <CircleCheck className="size-5 text-lime-300" />
                          <span className="text-zinc-100">{activity.title}</span>
                          <span className="text-zinc-400 text-sm ml-auto">
                            {format(activity.occursAt, 'HH:mm')}h
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </>
              ) : (
                <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
              )
            }
          </div>
        )
      })}
    </div>
  )
}
