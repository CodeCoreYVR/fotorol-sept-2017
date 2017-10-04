const Express = require('express')
// The Express is returned as function and we can use
// to create a web application by calling it.
// 👇 creates an instance of a Express web app server.
const app = Express()

app.get('/', (request, response) => {
  // The `request` object represents what the client is
  // asking of the server.
  // The `response` object represents the reply that our
  // server is going to send to the client.

  response.send(`Hello, Class!`)
})

const PORT = 4545;
app.listen(
  PORT,
  () => console.log(`💁 Server listening on http://localhost:${PORT}`)
)
