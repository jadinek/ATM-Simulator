import { Request, ResponseToolkit, ResponseObject } from 'hapi'
import { createIso0100Message } from '../services/createIsoMessage'

export async function create (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  try {
    request.server.app.logger.info('Withdrawal Controller: Received create withdrawal request.\npayload:' + JSON.stringify(request.payload))
    const payload = JSON.stringify(request.payload)
    const MSISDN = JSON.parse(payload).MSISDN
    const amount = JSON.parse(payload).amount

    if (Number(amount)) {
      const isoMessage = createIso0100Message(MSISDN, amount)
      request.server.app.tcpClient.sendIsoMessage(isoMessage)
    } else {
      request.server.app.logger.info('Invalid amount.')
      return h.response('Amount field should be a whole number represented as a string.').code(400)
    }
    return h.response().code(200)
  } catch (error) {
    return h.response().code(500)
  }
}
