import { Request, ResponseToolkit, ResponseObject } from 'hapi'
import { createIso0200Message } from '../services/createIsoMessage'

export async function create (request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  try {
    request.server.app.logger.info('Authorization Controller: Received create authorization request.\npayload:' + JSON.stringify(request.payload))
    const payload = JSON.stringify(request.payload)
    const otp = JSON.parse(payload).otp
    const isoMessage = createIso0200Message(otp)

    request.server.app.tcpClient.sendIsoMessage(isoMessage)
    return h.response().code(200)
  } catch (error) {
    return h.response().code(500)
  }
}
