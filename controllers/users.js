const kx = require('../db/connection')

const UsersController = {
  new (req, res, next) {
    res.render('users/new')
  },
  create (req, res, next) {
    res.send(req.body)
  }
}

module.exports = UsersController
