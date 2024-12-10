require('./models/User')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')

const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

const mongoUri = 'COPY_AND_PASTE_FROM_ENV_FILE'

if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`)
}

mongoose.set('strictQuery', true)
// resolves future deprecation issue with Mongoose v7

mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err)
})

// NEW add requireAuth as second param to verify and look up user
app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
