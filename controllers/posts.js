const kx = require('../db/connection')

const PostsController = {
  index (req, res, next) {
    kx
      .select()
      .from('posts')
      .orderBy('created_at', 'DESC')
      .then(posts => res.render('posts/index', {posts}))
  },
  show (req, res, next) {
    const {id} = req.params

    kx
      .first()
      .from('posts')
      .where({id}) // <-- syntax sugar for {id: id}
      .then(post => res.render('posts/show', {post}))
  },
  create (req, res, next) {
    const {content, username} = req.body;
    const {filename} = req.file;

    kx
      .insert({content: content, username: username, photo_path: `/uploads/${filename}` })
      .into('posts')
      .then(() => res.redirect('/posts'))
  }
}

module.exports = PostsController
