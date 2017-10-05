const Express = require('express')
const router = Express.Router()
const kx = require('../db/connection')

router.get('/', (request, response) => {

  // Form data is available as an object on the property `request.body`
  // if you've setup `body-parser` middleware.
  console.log(request.body)

  // Doing database query with knex is asynchronous operation. knex
  // will return the results. We will receive the results of query as
  // argument to the callback given to `.then`.
  // This means that any code must be run after query or that needs
  // the results must written inside of the body the callback passed to
  // `.then`
  kx
    .select()
    .from('posts')
    .then(posts => {
      response.render('index', {content: null, posts})
    })

  // response.render will render template a file from the `/views`
  // directory as the content the response to the client.
  // Specify file by it path skipping `/views` and disregarding
  // its extension.
  // response.render('index', {content: null})
})

router.post('/', (request, response) => {
  // Form data is available as an object on the property `request.body`
  // if you've setup `body-parser` middleware.
  console.log(request.body)

  const {body} = request;
  // 👆 syntax sugar for 👇
  // const body = request.body;

  // request.body's properties will be all the name attributes of the
  // input fields in the submitted form. We have `textarea` with the `name`
  // `content` which makes available on `request.body`.
  const {content} = request.body;

  kx
    .insert({content: content})
    .into('posts')
    .then(console.log)

  // response.render can take a second argument. It's an object where
  // all of its properties will be available as local variables inside of
  // of the rendered template.
  // response.render('index', body)

  // response.redirect will respond to the client with status code 302.
  // Indicating that it should make a GET request the given URL as argument.
  // `/` in this case.
  response.redirect('/')
})

router.get('/about', (request, response) => {
  response.render('about')
})

router.get('/hello-world', (request, response) => {
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

// Assign to `module.exports` the object that you want the file export when it
// is required with the `require` function.
module.exports = router



//
