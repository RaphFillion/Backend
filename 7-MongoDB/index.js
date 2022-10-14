const mongoose = require('mongoose')
const User = require('./models/User')

async function main() {
  await mongoose.connect('mongodb://localhost:27017/exemple-mongoose')

  console.log('Connexion réussi!')

  // Première façon //
  /* const firstUser = new User({
    email: 'jean@example.org',
    firstname: 'Jean',
    lastname: 'Dupont',
    age: 30,
  })
  console.log(firstUser)
  await firstUser.save() */

  // Deuxième façon //
  /* const secondUser = await User.create({
    email: 'alice@example.org',
    firstname: 'Alice',
    age: 25,
  })
  console.log(secondUser) */

  // Trouver un modèle //
  /* const users = await User.find()
  console.log(users) */

  // Trouver avec ObjectId //
  /* const jean = await User.findById('6349a021d250e3288a39d763')
  console.log(jean) */

  // Trouver un modèle avec des attributs // age: {$greaterThanOrEqual: 15}
  /* const otherUsers = await User.find({age: {$gte: 15}})
  console.log(otherUsers) */

  // Faire un find plus complexe
  const otherOtherUsers = await User
    .find({
      /* age: {$gt: 50}, */
      $or: [
        {firstname: 'Jean'},
        {age: {$lt: 30}}
      ]
    })
    .select('firstname email -_id')
    .sort({firstname: 'asc'}) // .sort('firstname') => asc || .sort('-firstname') => desc
  console.log(otherOtherUsers)

  mongoose.disconnect()
}

main()  