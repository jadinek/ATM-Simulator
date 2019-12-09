import { createIsoMessage } from './createIsoMessage'
import { sendIsoMessage } from './tcpClient'
import { HOST, HTTP_PORT } from './index'
const Hapi = require('@hapi/hapi')

export async function startHttpServer () {
  const server = Hapi.server({
    port: HTTP_PORT,
    host: HOST
  })
  server.route({
    method: 'POST',
    path: '/withdrawal',
    handler: (request) => {
      // assumes perfect input
      const MSISDN = request.payload.MSISDN
      const amount = request.payload.amount

      const isoMessage = createIsoMessage(MSISDN, amount)
      const payload = request.payload

      sendIsoMessage(isoMessage)
      return { payload }
    }
  })
  await server.start()

  console.log(`HTTP Server running on port: ${HTTP_PORT}`)

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })
}
