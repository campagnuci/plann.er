import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function humanizeWeekDay (date: string) {
  const formatted = format(date, 'EEEE', { locale: ptBR })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
