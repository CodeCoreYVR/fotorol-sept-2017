const bcrypt = require('bcrypt')
const kx = require('../db/connection')

const UsersController = {
  async new (req, res) {
    res.render('users/new')
  },
  async create (req, res) {
    const {username, email, password, confirmPassword} = req.body


    try {
      if (password === confirmPassword) {
        const passwordDigest = await bcrypt.hash(password, 10)
        const user = kx
          .insert({username, email, passwordDigest})
          .into('users')
          .returning('*')

        res.redirect('/')
      } else {
        res.send(req.body)
      }
    } catch (error) {
      next(error)
    }
  },
}

module.exports = UsersController
