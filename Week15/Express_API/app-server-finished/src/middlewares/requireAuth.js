const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// to access our User model in another file
const User = mongoose.model('User')

// export our function
module.exports = (req, res, next) => {
  // destructure our authorization header from our header object
  const {authorization} = req.headers

  // check if a user did not provide authentication
  if (!authorization) {
    // send back a forbidden error code and a message
    return res.status(401).send('You must be logged in!')
  }
  // if the user passed the above check, they must have a valid token
  // extract it and remove 'Bearer '
  const token = authorization.replace('Bearer ', '')
  // verify the token
  // second argument is our secret key from authRoutes when we generate a JWT
  // third argument will be the callback function (flag as async)
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    // immediately check for errors
    if (err) {
      return res.status(401).send({error: 'You must be logged in'})
    }
    // payload contains the information we encoded in our JWT, we need to extract again
    const {userID} = payload
    // use that  userID to look up a user inside our DB
    const user = await User.findById(userID)
    // take that user as assign it to our req object
    req.user = user
    // call the next middleware inside our chain of middlewares
    next()
  })
}
