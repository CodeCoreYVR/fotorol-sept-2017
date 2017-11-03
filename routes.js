const path = require('path')
const {Router} = require('express')
const PostsController = require('./controllers/posts')
const CommentsController = require('./controllers/comments')
const UsersController = require('./controllers/users')
const SessionsController = require('./controllers/sessions')
const multer = require('multer')

const upload = multer({dest: path.join(__dirname, 'public', 'uploads')})

// Define Router Instances
const root = Router()
const posts = Router()
const comments = Router({mergeParams: true})
const users = Router()
const session = Router()
// When nesting routers, the URL params of the parent
// are lost by default. To keep them, specify it with
// the option {mergeParams: true}

function authenticate (req, res, next) {
  if (!req.currentUser) {
    res.flash('warning', 'Please Sign In first!')
    res.redirect(`/session/new`)
  } else {
    next()
  }
}

// Root Routes (a.k.a. Base Routes)
root.get('/', PostsController.index)

// Post Routes
root.use('/posts', posts)
// 👆 Make all posts routes begin with `/posts`
posts.get('/', PostsController.index)
posts.use(authenticate)
posts.post('/', upload.single('photo'), PostsController.create)
posts.get('/:id', PostsController.show)
posts.get('/:id/edit', PostsController.edit)
posts.delete('/:id', PostsController.destroy)
posts.patch('/:id', upload.single('photo'), PostsController.update)

// Comments Routes
posts.use('/:postId/comments', comments)
comments.post('/', authenticate, CommentsController.create)

// Users Routes
root.use('/users', users)
users.get('/new', UsersController.new)
users.post('/', UsersController.create)

// Session Routes
root.use('/session', session)
session.get('/new', SessionsController.new)
session.post('/', SessionsController.create)
session.delete('/', SessionsController.destroy)

module.exports = root





// bump
