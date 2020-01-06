import { startHttpServer } from './httpServer'
import { CreateTcpClient } from './tcpClient'

const HTTP_HOST = process.env.HTTP_HOST || 'localhost'
const TCP_HOST = process.env.TCP_HOST || 'localhost'
const HTTP_PORT = process.env.HTTP_PORT || 4000
const TCP_PORT = process.env.TCP_PORT || '3001'

const start = async (): Promise<void> => {
  let shuttingDown = false

  const tcpClient = new CreateTcpClient()
  tcpClient.client.connect(TCP_PORT)
  console.log(`TCP Client listening on port: ${TCP_PORT}`)

  const server = await startHttpServer({ tcpClient }, { host: HTTP_HOST, port: HTTP_PORT })
  server.start()
  console.log(`HTTP Server running on port: ${HTTP_PORT}`)

  process.on(
    'SIGINT',
    async (): Promise<void> => {
      try {
        if (shuttingDown) {
          console.warn(
            'received second SIGINT during graceful shutdown, exiting forcefully.'
          )
          process.exit(1)
        }

        shuttingDown = true

        // Graceful shutdown
        await server.stop()
        console.log('completed graceful shutdown.')
      } catch (err) {
        const errInfo =
              err && typeof err === 'object' && err.stack ? err.stack : err
        console.error('error while shutting down. error=%s', errInfo)
        process.exit(1)
      }
    }
  )
}

start()
