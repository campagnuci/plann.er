import { EmailInput } from './email-input'

export function cancelTripHtml ({ destination, formattedStartDate, formattedEndDate }: Omit<EmailInput, 'confirmationLink'>) {
  return `
    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
      <p>A viagem a qual você havia sido convidada para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong> foi cancelada.</p>
      <p></p>
      <p>Verifique com seu grupo o motivo. E caso seja de interesse de vocês, utilize o plann.er novamente.</p>
      <p></p>
      <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
    </div>
  `.trim()
}
