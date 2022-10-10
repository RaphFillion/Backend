const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const port = 3000

// Utilisation de session pour les vues
app.use(session({
  secret: 'ZIeiZNQNRxo19h51fnCKZob7j3SZWBNq',
  resave: false,
  saveUninitialized: true
}))

// Faire marcher le traitement de formulaire
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public'))

// MiddleWare = Permet de faire des manipulations avec les GET/POST
const logRequest = (req, res, next) => {
  console.log(`~ ${new Date().toLocaleTimeString()} - [${req.method}] [${req.originalUrl}]`)
  req.user = {id: 5}
  next()
}

app.get('/', logRequest, (req, res) => {
  if (!req.session.views) req.session.views = 0
  req.session.views++
  res.send(`Hello world! Vous avez consulté cette page ${req.session.views} fois`)
})

app.get('/bonjour', logRequest, (req, res) => {
  // query = dans l'url
  // params = /bonjour/:prenom/:nom
  // const text = `Bonjour ${req.params.prenom} ${req.params.nom}`;
  console.log(req.user)
  const text = `Bonjour ${req.query.prenom} ${req.query.nom}`;
  res.send(text)
})

app.get('/articles/:id', (req, res) => {
  console.log(req.params);
  console.log(req.query)
  res.send(`Article #${req.params.id} du blog`)
})

app.get('/fichier/html', (req, res) => {
  console.log(__dirname, path.join(__dirname, './views/index.html'))
  res.sendFile(path.join(__dirname, './views/index.html'))
})

app.post('/fichier/html', (req, res) => {
  console.log(req.body)

  if(req.body.password == '1234') res.send('Connexion réussie !')
  else res.redirect('/fichier/html?mdpIncorrect=1')

  // res.send('Formulaire traité')
})

// page 404
app.use((req, res) => {
  res.status(404).send('Erreur 404. Page non trouvée.')
})

app.listen(port, () => {
  console.log('serveur lancé sur le port ' + port)
})