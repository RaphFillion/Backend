const express = require('express')
const app = express()
const port = 3000

const articles = [
  {
    title: 'Débuter avec Node.js',
    category: 'Développement web',
  },
  {
    title: 'Node.js vs PHP',
    category: 'Développement web',
  },
  {
    title: 'Les sockets en C',
    category: 'Programmation',
  },
  {
    title: 'Quel système d’exploitation utiliser ?',
  },

]

app.set('view engine', 'ejs')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  /* const template = path.join(__dirname, 'views/index.ejs');
  const data = {}
  const options = {}

  // err => erreurs, str => réponse
  ejs.renderFile(template, data, options, (err, str) => {
    res.send(str)
  }) */

  res.render('pages/home')

})

app.get('/hello/:name', (req, res) => {
  res.render('pages/hello', {name: req.params.name})
})

app.get('/posts', (req, res) => {
  res.render('pages/posts-list', { posts: articles })
})

app.listen(port, () => {
  console.log(`Serveur lancé sur le port localhost:${port}`)
})