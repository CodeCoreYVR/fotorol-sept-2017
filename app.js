const Express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('flash')
const KnexSessionStore = require('connect-session-knex')(session)
const kx = require('./db/connection')

// 🛣 ROUTES
const root = require('./routes')

// The Express is returned as function and we can use
// to create a web application by calling it.
// 👇 creates an instance of a Express web app server.
const app = Express()
// 👇 configures our Express application to use the `ejs` templating
// language to render our views. For this to work, you must have the `ejs`
// package installed.
app.set('view engine', 'ejs')

// To serve images, css, javascript, sounds & videos to a client of your
// serve you must make them available with the Express.static middleware.
// This will URLs for all files inside a given directory.
// (e.g.
// For a file public/css/index.css, the url would be http://localhost:4545/css/index.css
// For a file public/index.js, the url would be http://localhost:4545/index.js
// )

// __dirname is a global variable in node that returns the full path
// to the file where it is written.

// `path.join` is a method that joins a bunch strings together into
// a path (e.g. path.join('project', 'fotorol', 'public') // project/fotorol/public )
app.use(Express.static(path.join(__dirname, 'public')))
// morgan is a package for creating middleware functions that log
// information about your app's requests and responses.
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
// 👇 We're using methodOverride middleware in its simplest form.
// It will look for a query in the URL with key `_method` as written below.
// If the value for that key is a valid HTTP verb and the request is being
// as a POST, then that verb will be used replace POST.
// Example:
// POST to http://localhost:3000/posts?_method=DELETE
// 👆 The POST will be overriden with the DELETE method.
app.use(methodOverride('_method'))
app.use(session({
  name: '_fotorol',
  secret: 'supersecret', // key used to encrypt session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // A day (in milliseconds)
  },
  resave: true,
  saveUninitialized: false,
  store: new KnexSessionStore({knex: kx})
}))
app.use(flash()) // 👈 Must be add after session middleware (requires it to function)
// Middleware functions are called in order of appearance in the
// code. This one happens before our hello world below.
app.use(async function setCurrentUser (req, res, next) {
  const {userId} = req.session

  let user
  req.currentUser = false
  res.locals.currentUser = false // 👈 The `res.locals` object's properties are
  // available as variables in ALL VIEWS in the application. This how we're
  // going to set a `currentUser` that is usable anywhere in our views.

  if (userId) {
    user = await kx.first().from('users').where({id: userId})
    req.currentUser = user
    res.locals.currentUser = user
  }

  next()
})


/*
app.use((request, response, next) => {
  const {method, path} = request;
  // 👆 assigns the property `method` from `request` to the variable `method`.
  // const method = request.method;
  // const path = request.path;
  // This is called destructuring

  const message = `${method} ${path} at ${new Date()}`
  console.log(message);

  // next is function given to middleware callbacks as an argument.
  // It is always the third argument. When called, Express will move
  // on the next middleware in line.
  next();
})
*/
app.use(root)

const PORT = 4545;
app.listen(
  PORT,
  () => console.log(`💁 Server listening on http://localhost:${PORT}`)
)
