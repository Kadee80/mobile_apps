require('./models/User')
// import express
const express = require('express')
// import mongoose to communicate with mongoDB
const mongoose = require('mongoose')
// import bodyparser for handling our request bodie's json
const bodyParser = require('body-parser')

// import our authRoutes
const authRoutes = require('./routes/authRoutes')

// our one time available URI, put in a .env for safe keeping and DONT publish this line of code to github!
const mongoUri = 'COPY_PASTE_FROM_ENV_TO_CONNECT'

// connect to our DB via mongoose
mongoose.connect(mongoUri)

// think of this as an event listener
mongoose.connection.on('connected', () => {
  console.log('Successfully connected to our mongo instance!')
})
// listen for errors as well
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err)
})
// create an app object, this is our application
const app = express()

// enable the ability to parse JSON from the body of reqs/ress
app.use(bodyParser.json())

//use the router - obviously this needs to go AFTER we create our app object
app.use(authRoutes)

// our first route handler, any time a user makes a request to `/`
// run the function (second argument)
// req = request, res = result/response
app.get('/', (req, res) => {
  // for now send back a plain text message
  res.send('Hello first express route!')
})

// have our app listen on a specific port on our machine
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
