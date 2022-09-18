const http = require('http')

const hostName = '127.0.0.1'
const port = 3000

const server = http.createServer((request, response)  => {
  response.statusCode = 200
  response.setHeader('Content-type', 'text/plain')
  response.end('Hello world test')
})

server.listen(port, hostName, () => {
  console.log(`Server runnng at http://${hostName}:${port}`)
})