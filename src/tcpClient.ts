import net from 'net'

export type tcpClient = {
  sendIsoMessage: (isoMessage: Buffer) => void;
}

export class CreateTcpClient {
  client = new net.Socket()
  connected = false

  establishConnection (port: number, host: string) {

    this.client.connect(port, host)

    this.client.on('connect', () => {
      console.log(`TCP Client listening on port: ${port}`)
      this.connected = true
    })
    this.client.on('error', (Error) => {
      console.log(`tcpClient: failed to establish connection.\n${Error}`)
    })
    this.connected = false
  }

  sendIsoMessage (isoMessage: Buffer) {
    if (this.connected) {
      this.client.write(isoMessage)
      console.log('ISO message successfully sent.\n', { isoMessage })
    } else { throw new Error('Cannot send ISO message.') }

  }
}
