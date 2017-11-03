const bcrypt = require('bcrypt')
const kx = require('../db/connection')

const UsersController = {
  new (req, res, next) {
    res.render('users/new')
  },
  async create (req, res, next) {
    const {username, email, password, confirmPassword} =  req.body

    // 1. Check password and confirmation are the same
    if (password !== confirmPassword) {
      req.flash('danger', 'Password and password confirmation do not match')
      return res.redirect('/users/new')
    }

    try {
      // 2. Hash password before saving to db
      const passwordDigest = await bcrypt.hash(password, 10)

      // 3. Save user to db
      const [user] = await kx
        .insert({username, email, passwordDigest})
        .into('users')
        .returning('*') // knex returns the user as object inside an array
        // This is why we need to destructure it with `const [user] = await ...`

      if (user) {
        // 4. If user was successfully added, store their id in the session
        req.session.userId = user.id
        req.flash('success', 'Thank you for signing up!')
        res.redirect('/')
      } else {
        req.flash('danger', 'Something went wrong')
        res.redirect('/users/new')
      }

    } catch (error) {
      next(error)
    }
  }
}





module.exports = UsersController
