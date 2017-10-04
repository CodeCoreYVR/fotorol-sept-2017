const Express = require('express')
const morgan = require('morgan')
// The Express is returned as function and we can use
// to create a web application by calling it.
// 👇 creates an instance of a Express web app server.
const app = Express()
// 👇 configures our Express application to use the `ejs` templating
// language to render our views. For this to work, you must have the `ejs`
// package installed.
app.set('view engine', 'ejs')

// morgan is a package for creating middleware functions that log
// information about your app's requests and responses.
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

app.get('/', (request, response) => {

  // response.render will render template a file from the `/views`
  // directory as the content the response to the client.
  // Specify file by it path skipping `/views` and disregarding
  // its extension.
  response.render('index')
})

app.get('/hello-world', (request, response) => {
  // The `request` object represents what the client is
  // asking of the server.
  // The `response` object represents the reply that our
  // server is going to send to the client.

  // When running node with the `--inspect` command,
  // you open a Chrome console and click on the Node logo in the
  // upper-left corner of the console to open a dedicated
  // debugger for Node. Anywhere you write the keyword, `debugger`
  // in you code, the debugger will pause program and you'll
  // be able to inspect the state of your program.
  // debugger
  response.send(`Hello, Class!`)
})

const PORT = 4545;
app.listen(
  PORT,
  () => console.log(`💁 Server listening on http://localhost:${PORT}`)
)
