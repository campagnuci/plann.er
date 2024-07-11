import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.locale('pt-BR')
dayjs.extend(localizedFormat)

export { dayjs }
