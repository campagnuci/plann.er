import { format } from 'date-fns'

type DateRange = {
  from: Date | string | undefined
  to?: Date | string | undefined
}

export function mergeDatesToString ( dateRange: DateRange): string | null {
  return dateRange && dateRange.from && dateRange.to ?
    format(dateRange.from, "d' de 'LLL").concat(' até ').concat(format(dateRange.to, "d' de 'LLL")) :
    null
}
