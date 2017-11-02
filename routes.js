const path = require('path')
const {Router} = require('express')
const PostsController = require('./controllers/posts')
const multer = require('multer')

const upload = multer({dest: path.join(__dirname, 'public', 'uploads')})

// Define Router Instances
const root = Router()
const posts = Router()

// Root Routes (a.k.a. Base Routes)
root.get('/', PostsController.index)

// Post Routes
root.use('/posts', posts)
// 👆 Make all posts routes begin with `/posts`
posts.get('/', PostsController.index)
posts.post('/', upload.single('photo'), PostsController.create)
posts.get('/:id', PostsController.show)
posts.delete('/:id', PostsController.destroy)


module.exports = root
