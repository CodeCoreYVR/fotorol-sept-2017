const kx = require('knex')({
  client: 'pg',
  connection: {
    database: 'fotorol_dev'
  }
})

module.exports = kx
