const mongoose = require('mongoose')

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

// Finally, we need to associate this Schema with mongoose
mongoose.model('User', userSchema)
