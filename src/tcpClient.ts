import net from 'net'

export class CreateTcpClient {
  client = new net.Socket()

  sendIsoMessage (isoMessage: Buffer) {
    this.client.write(isoMessage)
    console.log('ISO message successfully sent.\n', { isoMessage })
  }
}
