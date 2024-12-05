# Setting up an Express API and MongoDB

Well, we are officially into the bonus content for the class, so why not teach you something else you need to know? We just finished wiring up JSON-Server to achieve data persistence for your CRUD application. The Axios usage and React Native code we wrote is definitely valid for a production project, but JSON-Server clearly states that it is for education/research usage, not production. Why? Because there is no security. Your database is a file on your machine. Although this is not a back end class by any means, I do know enought to show you how to set up an Express Server.

Today we will look at setting up and Express API Server that will route our requests to a MongoDB instance. We will look at how to configure the routes, encrypt sensitive data, and authenticate new and existing users for your future apps. We will not be writing the React Native code for the front end, but if you followed along this semester, I have great hope you could write it yourself. Why are we learning this? Well, it's my job to prepare you to get and keep jobs after college. This is something I wish I had explained to me before I went to work.

## Setting up an Express Project

To get started, we are going to have to create a new project on our computers. Go ahead and `cd`/`dir` into wherever you take you class notes, and we are going to use `mkdir` to create a new project.

1. Create a new project directory:

```bash
mkdir app-server
```

2. Make sure you `cd/dir` into your new project:

```bash
mkdir app-server
```

3. Next, we need to initialize our new project. This time we will answer yes to all of those questions right away with a flag:

```bash
npm init -y
```

4. Now we need to install a bunch of dependencies up front:

```bash
npm install bcrypt express jsonwebtoken mongoose nodemon
```

5. Open your project in VSCode:

```bash
open .
```

6. Create a `src/` directory for your code.
7. Create a file inside `src/` for the root of our project called `index.js`
8. Now we are going to write the bare minium server code. We will create a single route have Express listen for it on a port in our localhost.

9. Import/require the express library

```js
const express = require('express')
```

10. Create an app object, this reps our entire application!

```js
const app = express()
```

11. Add our first route handler, any time a user makes a get request to our root route, run the function (second argument)
    req = request, res = response

```js
app.get('/', (req, res) => {
  // for now, send back a plain text message
  res.send('Hello first route!')
})
```

12. Have our app listen on a specific port on our machine

```js
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
```

13. Believe it or not that's all the code we need to start running our server! To run your server, in terminal enter the following (the path separator on windows will look a little different)

```bash
 node src/index.js
```

And congrats! Your server is up and running! If you get any sort of error, changes are you have something else running on port 3000. You can either kill that other process or change the port in your code.

14. Finally, we need to test our first route by navigating to `localhost:3000` in our browser. You should see whatever message you entered in your `res.send(...)` code. Now we need to shift focus to our database setup.

## MongoDB Signup and Setup

Before we start writing the code for our server, we will need a database to store our user data. MongoDB is used often in production, and lucky for us, they have a free cloud hosted version available. You will need to sign up and sign in to MongoDB before we can continue.

We will be interacting with MongoDB using a library called Mongoose. We installed along with a few other libraries when started our project. More on that soon!

[MongoDB Sign Up](https://www.mongodb.com/products/platform/cloud)

1. Sign Up for an Atlas Account. You will need to answer a few questions and confirm your email to continue.

2. When you get to a screen that asks you for payment info, scroll down to the `[do this later]` button. This should lead you to a dashboard of sorts.

3. Assuming you've never used this service before, you should not have any existing 'clusters'. You should see a big green button in the middle of your screen that says `[create]`. Go ahead and click it!

4. When you create a cluster, you can choose between several different plans. Clearly we want the `M0` free one!

5. Next you can choose from several different services. I will leave AWS selected. Make sure whichever service and location you choose, make sure it very clearly states `free tier` to avoid paying!

6. Name your cluster something obvious, and click `[Create Deployment]` at the bottom of the screen.

7. Next you will see a modal that tells you your current IP address has been automatically whitelisted. This is super important to remember because if you change locations, or computers, you will need to whitelist your next IP addresses here.

8. You need to create an admin user name and password. Make it something you wont forget and is easy to type because we will need to use it in our code shortly. There is a copy button next to the fields. I suggest you copy/paste it somewhere on your computer.

9. Next we need to choose our connection method. Sorry, no easy GUIs here. Choose the first option `Drivers`.

10. You can kind of ignore sections 1 + 2 here. We are looking for the connection string in the third step `Add your connection string into your application code`. You should see a connection string there. Click the copy button because we are going to need this for our code!

11. Open up your `index.js` and paste that string you just copied. Wrap it in string quotes and assign it the variable name: `const mongoUri = 'that string you just copied goes here in string quotes'`. _MAKE SURE YOU DO THIS NOW! It even says below that it will not be available again after this screen!_

12. **After** you have copied that connection string, you can click the `[Done]` button.

NOTE ABOUT WHITELISTING IPS: You will have different IP addresses assigned as you move around in the world. If you go home to your own WiFi network, or sit down in a cafe with free WiFi and are working on this project, you may have to whitelist another address. To do that, find the `Network Acess` link on the left sidebar of our dashboard to add a new IP.

## Connecting our Server to Mongo

Now that we have our connection string, let's use it!

1. First, we need to import/require mongoose in order to use it to connect:

```js
const mongoose = require('mongoose')
```

2. After we declare our app, we will use mongoose to connect and add a listener of sorts that logs a message on successful connection:

```js
// connect via mongoose
mongoose.connect(mongoUri)
// think of this as an event listener for a connection
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance!')
})
```

3. We also need to listen for errors:

```js
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to Mongo', err)
})
```

4. Use `control + c` to kill your current server and connect again:

```js
node src/index.js
```

5. Hopefully, you see your connection message and not an error. If there is an error, there may be some extra spaces accidentally added in your connection string, check your `mongoUri` if this is the case.

6. Running that `node` command every time we make a code change is tedious. Luckily, we already installed a library to watch for changes and restart our server. We can add in a script to our `package.json` file to easily do that! Remember, windows users will have a slightly different path delimiter.

```json
  "scripts": {
    "dev": "nodemon src/index.js"
  },
```

7. Now, in terminal you can enter:

```bash
npm run dev
```

To use nodemon to watch for code changes and automatically restart your server when they are detected!

## Signup Rules

Before we use another tool to send some POST requests to our server, we should breifly review our rules for a new signup.

1. Emails bust be unique, we cannot have 2 users signing up with the same email.

2. Our Express API will reach out ahead of time and check with Mongo to confirm that this email does not already exist in our DB.

3. If it does not, great! We can go ahead and create an account with that email and password.

4. If that email already exists, throw an error!

5. If we can create a new user account, our server is going to generate a JWT - JSON Web Token for authentication. Any requests by that user in the future will need to send along that JWT in order to authenticate. We will go into greater detail on this step next class. But for now, think of it as an unfakeable ID that proves that the user is who they say they are. In order for a user to be officially logged in, they need thier JWT.

## Signup Route

Before we can test the rules above, we need to create a `/signup` route.

1. In your project, inside the `src/` folder, create a new folder called `routes/`.

2. Inside `routes/` create a new file called `authRoutes.js`. This is where we will write our any code that needs to handle our authentication logic.

3. Make sure you require express at the very beginning:

```js
const express = require('express')
```

4. Next, we need to create a router object. A router is an onject that allows us to associate some amount of routes with it. We can eventually take this router, and associate it with our app object.

```js
const router = express.Router()
```

5. Create our signup route:

```js
router.post('/signup', (req, res) => {
  // for now, just send a message back
  res.send('You made a post request to signup!')
})
```

6. And finally, export it so we can use it in our app:

```js
module.exports = router
```

7. Now in `index.js` we need to import it up at the top:

```js
const authRoutes = require('./routes/authRoutes')
```

8. Now to use it, make sure you add this line AFTER you create your app object!

```js
const app = express()
// NEW:
app.use(authRoutes)
```

9. Our code is all set for testing a POST request to our new `/signup` route. The issue is, our browser always makes GET requests when it visits a new URL. We will wrap up today's class by testing this route using an App called `Postman`.

## Hello Postman!

We need a (free) tool to easily make test POST requests to our new route. Enter Postman. Some of you may have used it before. If you have not, let's take a moment to download and install it on our computers.

[download postman](https://www.postman.com/downloads/)

NOTE: You don't need to sign up/ sign in to use Postman if you don't want to. We can simply continue with the lightweight API client.

1. Once you have downloaded and installed Postman, click the use lightweight API client option and you will see a simple interface.

2. We want to make a POST request so select that option from the dropdown. We are making the request to `localhost:3000/signup`.

3. Click send and you should see the message you entered in your `/signup` route code appear on the lower half of the dashboard. If you get an error, there may be a typo in your URL or your code. PS - make sure you SAVED the changes to your code! (Your teacher didn't when writing this).

4. OK, we made a POST request to the correct route, but obviously our App would have a form, and send along some JSON containing the `email` and `password` of the user. We now need to set up our Express servers ability to handle JSON.

5. First we need to require another library inside index.js:

```js
const bodyParser = require('body-parser')
```

6. Now we use bodyParser to parse JSON from the body of any requests. Make sure you add this line BEFORE you connect your authRoutes! Now, when a JSON type body is sent with a request, it will be parsed and added to the `req.body`.

```js
app.use(bodyParser.json())
app.use(authRoutes)
```

7. Inside `authRoutes.js` we are going to simple console.log out our request body for this round.

```js
router.post('/signup', (req, res) => {
  // after we enable bodyParser!
  console.log(req.body)
  res.send('You made a post request to signup!')
})
```

8. Now we need to use Postman to send along some JSON as the body of our POST request. We are still making a POST request to `localhost:3000/signup`. Find the `body` tab right underneath the address bar. Select the `raw` option.

9. Enter the following in the text block below. Remember, we are sending JSON so double quotes all over the place!

```json
{
  "email": "test@fake.com",
  "password": "password123"
}
```

10. One more thing before we can send this request! We need to make sure that our request tells our server that it contains some JSON data in the body. Select the `headers` tab.

11. Enter `Content-Type` for the key. Enter `application/json` for the value. Make sure the checkbox next to these entries is checked!

12. Hit `Send`! You should see a success message below. Take a look at your terminal where the `req.body` should be logged.

## User Schema and Validation

Now that we are sending some JSON information to our Server, we need to make sure nobody has used that email before. To do that, our Server needs to know how to reach out to Mongo and check this. We use `Mongoose` to communicate with `Mongo`.

We need to create a `users model`. That is what `Mongoose` uses to describe what will be saved in `Mongo` as a `users collection`. Think of a `Mongo` collection as an array of user objects (it's not, but thats how we can visualize it). We need to tell `Mongo` that each `user` is going to have a name and password, and they both need to be `Strings`.

1. Inside VSCode, create a new folder called `models/` inside your `src/` directory. Create a new file named `User.js`.

2. Require mongoose at the top of your file, and then define our `user.Schema`:

```js
const mongoose = require('mongoose')

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
```

3. Then, associate it with mongoose:

```js
mongoose.model('User', userSchema)
```

4. Finally, inside `index.js` at the very top of your file, require the model we just created. We do not assign this a variable, mongoose only expects that last line of code in User.js to be executed once. If we fully imported it all over the place, it would be called multiple times and cause errors. We cannot define it again elsewhere.

```js
require('./models/User')
```

5. To get access to the User model in our routes, in `authRoutes.js` we do this:

```js
const mongoose = require('mongoose')
const User = mongoose.model('User')
```

6. Now we can use that User Model to validate/check any incoming user requests and validate and save them. You may have noticed we did not have to define anything about this User Collection inside MongoDB. Mongoose is our messenger and that collection isd auttomatically taken care of by our User Schema.

7. Now its time to use our `User` Model to create a new user and store it inside MongoDB. Inside `authRoutes.js`:

```js
router.post('/signup', (req, res) => {
  console.log(req.body)

  // destructure out our email and password
  const {email, password} = req.body
  // use them to create a new user
  const user = new User({email, password})
  // this writes it to the DB
  user.save()

  res.send('You made a post request to signup!')
})
```

8. But wait, this function is now making a request to our DB. We better flag it as `async` ASAP!

```js
router.post('/signup', async (req, res) => {
  console.log(req.body)

  // destructure out our email and password
  const {email, password} = req.body
  // use them to create a new user
  const user = new User({email, password})
  // this writes it to the DB
  await user.save()

  res.send('Saving a user (hopefully)')
})
```

9. Now we are ready to test this out with Postman and create our first user! Make sure you still have your body, and header settings from the previous POST request. If everything is all set, you can click `[Send]`. Check your Postman message and terminal to make sure you didn't get any errors.

10. We can verify this in our MongoDB dashboard by selecting our cluster, finding the name we added, and selecting the now visible `User` section.

OK. That was a lot of new stuff! Next Class we will look into error handling and authentication!
