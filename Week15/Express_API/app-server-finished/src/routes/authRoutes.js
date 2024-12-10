const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = new User({email, password})
    await user.save()

    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    res.send({token})
  } catch (err) {
    return res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const {email, password} = req.body
  // make sure we have both fields
  if (!email || !password) {
    return res.status(422).send({error: 'Invalid password or email'})
  }
  // loook it up
  const user = await User.findOne({email})
  // if we cant find the user in DB
  if (!user) {
    return res.status(422).send({error: 'Invalid password or email'})
  }

  // passed our checks, now we can compare
  try {
    // the method we just added to User
    await user.comparePassword(password)
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    res.send({token})
  } catch (err) {
    return res.status(422).send({error: 'Invalid password or email'})
  }
})

module.exports = router
