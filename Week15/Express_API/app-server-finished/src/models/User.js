const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// this Schema is where we tell mongoose about the different properties
// our user collection has to have
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// Salting and Hashing
// we neded to use the function keyword here to have access to the keyword this,
// with an arrow function this = this file, we need it to be this user that we are saving
userSchema.pre('save', function (next) {
  const user = this
  // look at the password, if its plain text, generate that salt
  // ONLY if the user has not just modified their password
  if (!user.isModified(user.password)) {
    // give up and continue on
    return next()
  }
  // generate a salt string, then hash it, to do this we need the bcrypt lib
  bcrypt.genSalt(10, (err, salt) => {
    // give up on error
    if (err) {
      return next(err)
    }
    // hash it
    bcrypt.hash(user.password, salt, (err, hash) => {
      // give up on error
      if (err) {
        return next(err)
      }
      // update/overwrite the users plain text password
      user.password = hash
      // continue on with our save
      next()
      // that stores our hashed PW inside of our DB
    })
  })
})

// automate the password checking process for /signin
// add a method to our schema (using function keyword again)
// candidatePassword = incoming password the user supplies hen trying to login
userSchema.methods.comparePassword = function (candidatePassword) {
  // this = User Model
  const user = this
  // create a new Promise, we always pass it a callback function
  // automatically invoked with resolve and reject
  return new Promise((resolve, reject) => {
    // arg 1 = incoming candidate password
    // arg 2 = the salted and hashed password from our DB
    // arg 3 = callback called with err object and boolean if it matched or not
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }
      if (!isMatch) {
        return reject(false)
      }
      // if we passed those checks our passwords match
      resolve(true)
    })
  })
}

// Finally, we need to associate this Schema with mongoose
mongoose.model('User', userSchema)
