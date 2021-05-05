const seedUsers = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

const users = require("../user")
const db = require("../../config/mongoose")
// succeed in connecting
db.once("open", () => {
  for (let i = 0; i < seedUsers.length; i++) {
    const { firstName, email, password } = seedUsers[i]
    users.create({ firstName, email, password })
  }
  console.log("done!!")
})