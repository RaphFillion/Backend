const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world!')
})
app.get('/bonjour', (req, res) => {
  res.send('<h1>Bonjour tout le monde </h1>')
})
app.get('/fichier/html', (req, res) => {
  console.log(__dirname, path.join(__dirname, './views/index.html'))
  res.sendFile(path.join(__dirname, './views/index.html'))
})


app.listen(port, () => {
  console.log('serveur lancé sur le port ' + port)
})