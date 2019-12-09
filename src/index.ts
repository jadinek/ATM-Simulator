import { startHttpServer } from './httpServer'
import { createTcpClient } from './tcpClient'

export const HOST = 'localhost'
export const HTTP_PORT = 4000
export const TCP_PORT = 3001

startHttpServer()
createTcpClient()
