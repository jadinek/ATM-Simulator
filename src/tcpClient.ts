import net from 'net'
import { HOST, TCP_PORT } from './index'

const client = new net.Socket()

export async function createTcpClient () {
  client.connect(TCP_PORT, HOST, function () {
    console.log(`TCP Client listening on port: ${TCP_PORT}`)
  })
}

export function sendIsoMessage (isoMessage: Buffer) {
  client.write(isoMessage)
  console.log('ISO message successfully sent.\n', {isoMessage})
}

client.on('data', function (data) {
  console.log('Server return data : ' + data)
})
