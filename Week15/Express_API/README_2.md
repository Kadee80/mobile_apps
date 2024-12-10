# Express Server and MongoDB Continued

We ended last class with saving our first user to our MongoDB cluster. We had configured our first `model` with `mongoose` to help verify/validate the incoming user information with a `schema` that assigned a data type, and the fact that both fields were required. We also had a third property for the `email` field that enforced the fact that each user email must be unique. For those of you who successfully connected to MongoDB and tried to make the same POST request with the same data ran into issues, but nothing was properly communicated back to you. The request just hung there, Promise pending. Today, we will start with proper error handling.

## Error Handling in our Requests

To start, let's begin by making the same request (same user email and password) more than once. The first time you should see that User write to your MongoDB cluster. The second time however, the request just hangs and the progress bar keeps looping in Postman. If you look at your console, a massive error message is logged, and somewhere in there, it states a `duplicate key error`. The other possible error that might arise with this request, is not passing any or all of the required data. This too will result in a hanging request. Both of these errors are happening because we successfully configured our Schema, to state that both fields are required and that email must be unique. Mongoose is already doing some validation for us, now we have to relay those validation errors to the user in a much more user friendly way.

1. Sign in to MongoDB so you can view your cluser at [cloud.mongodb.com](https://cloud.mongodb.com)

2. You should arrive at your dashboard and get a toast notification that `your current ip address is not added`. Click the button to add your current IP.

3. At the end of class, to avoid publishing our cluster access string to GitHub, we placed it in a `.env` file for safe keeping. Make sure you replace that line of code in `index.js`. We will configure `.env` usage before we end class today.

4. Open `authRoutes.js`. Validation is occuring when we attempt to save our user to the database with `await user.save()`. We can wrap this block of code with a `try/catch` statement:

```js
router.post('/signup', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = new User({email, password})
    await user.save()
    res.send('User created!')
  } catch (err) {}
})
```

5. We can pass the `error` object into the `catch` statement and send it back to the user. We need to set the `status` of our response. We will set it to `422` which is for invalid data, and then send back an error message to the user. We don't know which of the errors occurred, so for now we can start with sending back the error message. We will also add in a return statement here so that the server will not try and execute any later code if we produce an error:

```js
try {
  const user = new User({email, password})
  await user.save()
  res.send('User created!')
} catch (err) {
  return res.status(422).send(err.message)
}
```

6. Save your changes and start your server with nodemon using the script we created:

```bash
npm run dev
```

7.  Now, if you make a request with a duplicate email, or a request without the required fields you should recieve a human readable (but not very user friendly) message back in Postman! Try and produce at least 2 different errors.

## Creating JWTs - JSON Web Tokens

Now that some validation and decent error handling has been added, we can proceed to the next step in our user creation/authentication journey. The goal is on a successful save of a new User, generate a JWT for that User. The User will have to send thier JWT along with any further requests to prove it is them. Think of a JWT as a drivers licence. It is has certain security measures and is extremely to reproduce. It is used to prove who you are when trying to enter certain places or make certain transactions. A JSON Web Token is a unique string that proves that the user is who they say they are. Like a fake ID, JWTs can be faked by malicious people, but those fakes _could be_ easily detected. Much like a drivers lisence, we will be using some identifying information (the unique ID generated in MongoDB when saved) to create a JWT that stores that ID and is very hard to create/change without that unique ID from our server.

To really see what a JWT is and looks like and how it encodes information, go to [jwt.io](https://jwt.io/). We can copy a `_id` from an entry in our DB and add it to he payload section of the generator:

```json
{"userID": "6751ba47ba5f76d91c19277e"}
```

On the left side of the screen, you will see the JWT that was generated, encoding your information. Each section of the JWT is color coded with a section on the right. We can use this token, and allow it to be freely read by anyone. They can take it and decode it and see the information inside. BUT no one can make changes to it! This is what we will generate and use to prove a user is who they say they are.

If you look at the third section on the right, inside `verify signature` there is a line that says `your-256-bit-secret`. That will be replaced with another token which is unique to our server. Without that key, no one else can make changes to an existing token.

1. We should have already installed this library, but just in case:

```bash
npm install jsonwebtoken
```

2. Back in your code, let's start adding some code to create a new JWT when a User is created. To create a token in `authRoutes.js`:

```js
// make sure you import the library at the very top
const jwt = require('jsonwebtoken')

...

  try {
    const user = new User({email, password})
    await user.save()
    // create a JWT
    const token = jwt.sign({userID: user._id}, 'MY_SECRET_KEY')
    res.send('User created!')
  }
```

The first argument is the information we want to put inside out token. The second argument is the key we are going to use to sign the token. This key is another special piece of information we do not want to share with the outside world. If we were to share this publicly, someone else could generate valid JWTs for our DB with any arbitrary ID. For now, we will use a placeholder string, we will worry about storing later along with our `mongoUri` later on:

2. Rather than sending back a message after that, we can send back our new JWT. The key and values here are identical, so we can use shorthand for this object:

```js
  try {
    const user = new User({email, password})
    await user.save()
    // create a JWT
    const token = jwt.sign({userID: user._id}, 'MY_SECRET_KEY')
    // send it back to the user
    res.send({token})
  }
```

3. Now we are ready to test this out in Postman. Make sure you use a new fake email! On success you will recieve a new JSON Web Token.

## Wiring up our JSON Web Tokens

The next step is to use that token to validate that user inside a follow up request. We will start by checking that a user is sending us a valid token, and if so, allow them access to a protected resource.

1. Inside your `src/` directory, create a new folder names `middlewares/`. Inside your new folder add a file named `requireAuth.js`.

2. To get started inside `requireAuth.js`, require the libraries we need:

```js
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// to access our User model in another file
const User = mongoose.model('User')
```

3. Define and export a function called with a request, a response, and a next function. we call the next function after we have determined a user has a JWT. This is the first in a chain of middlewares. If we are through with all of our middleware successfully, we can move on to our protected request handler.

```js
module.exports = (req, res, next) => {
  // TODO
}
```

4. The user will have to provide their JWT inside a header for any new requests. Inside Postman, create a new tab, and we will write out this very special header. We will make a GET request to `/` which was the initial route we defined in `index.js` so our url will be:

```
localhost:3000/
```

5. Make sure you have selected GET for the request type.

6. Open up the headers section below the URL field and add:

KEY: `Authorization`
VALUE: `Bearer ` + copy and paste your JWT from the previous tab's response without the `"`, make sure you have a single space after Bearer.

7. Now we have to inspect any incoming request for this special header. Notice that when we destructure, it is lower case `authorization`. Express downcases everything for us.

```js
module.exports = (req, res, next) => {
  // pull off the authorization header from the request object
  const {authorization} = req.headers
  // authorization = 'Bearer dewsrdtfyguhijokl'

  // if a user did not provide authorization
  // this is not a valid request
  if (!authorization) {
    // send back a forbidden error code
    return res.status(401).send('You must be logged in!')
  }
  // if the user passed the check above, they must have had a valid token
  // extract it and remove the word Bearer and the space after it
  const token = authorization.replace('Bearer ', '')
  // verify the token,
  // the second argument is our secret key placeholder string from authRoutes.js
  // the third agrument is the callback function (async)
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    // immediately check for errors
    if (err) {
      return res.status(401).send({error: 'You must be logged in!'})
    }
    // payload contains the information we encoded in our JWT, extract it
    const {userId} = payload
    // use that userID to look up the user inside our DB
    const user = await User.findById(userId)
    // take that user and assign it to our req object
    req.user = user
    // call the next middleware inside our chain of middlewares
    next()
  })
}
```

8. Open up `index.js`. Require the authorization code we just wrote up at the top:

```js
// require our middeware authorization
const requireAuth = require('./middlewares/requireAuth')
```

9. Scroll down to the GET request to our default route `'/'` towards the bottom of the file and add it like so:

```js
app.get('/', requireAuth, (req, res) => {
  // send back the verified user email
  res.send(`Your email: ${req.user.email}`)
})
```

10. Make sure you save all of your files and it's time to test in Postman. Make sure you use the second tab which makes a GET request to `localhost:3000/` and contains the new header with the JWT we added earlier. Try adding an extra space inside your header to produce an error as well.

## Password Hashing

Right now, our passwords are stored as plain text inside our DB. This is clearly bad, because malicious coders could easily obtain all of our user emails and passwords! Some of our users might use that email and password in lots of places all over the internet, like say... their bank app.

We are going to store our passwords using a hashing algorithm. After we provide the password as an input to this hashing algorithm, it will give us back a unique String that is safe to store inside of our DB. If we provide the same password multiple times to the same hashing algorithm, we will always get back the same unique String.[We can see this in action with this webtool](https://miraclesalad.com/webtools/md5.php). NOTE: We are not using `md5`, we are using `bcrypt`.

Now that we can see how one of these algorithms works, let's take a quick look at the [Rainbow Table Attack](https://nordvpn.com/blog/what-is-rainbow-table-attack/).

To protect further against this, we can add a randomly generated string to our password before we `hash` it. That random string is called a salt. So first we concatinate our `salt` to the end of our password before we `hash` it. Then, after it is hashed, we add the `salt` to the end of our `hash` with a `.` joining the two when we store it inside of our database. By doing this, a hacker COULD still figure out some common passwords hashes inside our DB, but they would also need to append a bunch of random strings and be very persisten and slightly lucky.

Let's go ahead and add some salting and hashing to our code.

1. Open up `User.js` and we are going to add a pre save hook to salt and hash our password:

```js
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
// we need the function keyword here so we can have access to `this` within
userSchema.pre('save', function (next) {
  const user = this
  // look at the password, if it is plain text, generate that salt
  // if the user has not modified thier password
  if (!user.isModified(password)) {
    // give up and continue on
    return next()
  }
  // generate a salt and hash it, to do this we need to import the bcrypt lib
  bcrypt.genSalt(10, (err, salt) => {
    // give up on err
    if (err) {
      return next(err)
    }
    // hash it
    bcrypt.hash(user.password, salt, (err, hash) => {
      // give up on err
      if (err) {
        return next(err)
      }
      // update/overwrite the user's plain text password
      user.password = hash
      // continue on with save
      next()
    })
  })
  // store the actual result inside our DB
})

// Finally, we need to associate this Schema with mongoose
mongoose.model('User', userSchema)
```

2. Now its hashed, but we need some code to hash any incoming passwords from existing users so we can compare the 2. Add this after your salting and hashing code:

```js
// automate the password checking process
// add a method to our schema, we need the function keyword here again
// candidatePassword is the incoming password a user is entering to log in
userSchema.methods.comparePassword = function (candidatePassword) {
  // this = User model
  const user = this
  // create a new promise, we always pass it a callback function
  // invoked automatically with resolve and reject
  return new Promise((resolve, reject) => {
    // arg 1 is incoming candidate password
    // arg 2 is the salted and hashed pw from our DB
    // arg 3 is callback called with err obj and boolean t/f if it matched
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }
      if (!isMatch) {
        return reject(false)
      }

      // if we pass those checks, the passwords match
      resolve(true)
    })
  })
}
```

## Signin Route

We need a route for existing users to sign in to test the code we just wrote. We will also need it for user login in a new App. We need to call our `comparePassword` function whenever a user attempts to login.

1. Open up `authRoutes.js` and we will add a new route for a user login at the end of the file (before the exports).

```js
// NEW user signin route to test our salt + hash
router.post('/signin', async (req, res) => {
  // email and password will be in the req.body
  const {email, password} = req.body
  // make sure they provided both
  if (!email || !password) {
    return res.status(422).send({error: 'Must provide email and password'})
  }

  // proceed with the login process,
  // grab a user out of the DB with the given email, assign to var
  const user = await User.findOne({email})
  // if that email doesnt match one in DB/not found
  if (!user) {
    return res.status(404).send({error: 'Email not found'})
  }

  // passed the checks, go through comparison
  // remember our code in User.js returns a promise, so we need await and a try catch
  try {
    await User.comparePassword(password)
    // generate token
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
    res.send({token})
  } catch (err) {
    // 422 = somethings wrong with req
    // 401 = forbidden
    return res.status(422).send({error: 'Invalid email or password'})
  }
})
```

2. Finally, we can test this route and we have everything we ned for user sign up and sign in for any App we wish to create! IMPORTANT: Before we test anything, we need to delete any existing users from our DB because they are not salted or hashed. This could cause errors in the future if someone with those emails/passwords attempts to login.

- Go to your mongoDB dashboard
- Find your cluster
- Find the Users Collection
- Hover over any test emails and passwords you created before hashing and click the trash icon to delete them. There is a second confirm delete you must also click.

3. Now its time for Postman. First we need make a `POST` request to our `/signup` route. Dont forget the header and the body!

4. Now we can go to our MongoDB dashboard and view our encrypted password associated with the new user we created!

5. We can now use the same header and body (has the same email and password we just saved) to make a `POST` request to our new `/signin` route! If we are successful with our signin, we will not get an error, but a JWT back and it should be the same as the previous request's response.
