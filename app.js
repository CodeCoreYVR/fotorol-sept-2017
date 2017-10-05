const Express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// 🛣 ROUTES
const welcome = require('./routes/welcome')

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
// Middleware functions are called in order of appearance in the
// code. This one happens before our hello world below.
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

app.use('/', welcome)

const PORT = 4545;
app.listen(
  PORT,
  () => console.log(`💁 Server listening on http://localhost:${PORT}`)
)
