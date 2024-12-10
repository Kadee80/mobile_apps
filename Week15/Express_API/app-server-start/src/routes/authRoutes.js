const express = require('express')
// To access our user schema / model here
const mongoose = require('mongoose')
const User = mongoose.model('User')

// create a router
const router = express.Router()

// create a signup route
router.post('/signup', async (req, res) => {
  // for now, just send back a plain text message
  // res.send('Hello signup route, but with JSON')
  // this is after JSON parsing is enabled, log the reqest body in terminal
  // console.log(req.headers)
  console.log(req.body)
  // destructure from the request
  const {email, password} = req.body
  // use them to create a new user
  const user = new User({email, password})
  // write to our DB
  await user.save()
  // send a message if we get here
  res.send('User created!')
})

// export it for use elsewhere
module.exports = router
