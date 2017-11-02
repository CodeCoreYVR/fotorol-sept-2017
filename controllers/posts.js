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
  },
  destroy (req, res, next) {
    const {id} = req.params

    kx
      .delete()
      .from('posts')
      .where({id})
      .then(() => res.redirect('/posts'))
      .catch(error => next(error))
  },
  edit (req, res, next) {
    const {id} = req.params

    kx
      .first()
      .from('posts')
      .where({id}) // <-- syntax sugar for {id: id}
      .then(post => res.render('posts/edit', {post}))
  },
  update (req, res, next) {
    const {id} = req.params
    const {content, username} = req.body
    const post = {content, username}

    // req.params contains parameters from the URL
    // (e.g. /posts/:id/edit ~ /posts/16/edit --> req.params.id = 16)

    // req.query contains query parameters
    // (e.g /posts?search=happy --> req.query == {search: "happy"})

    // req.body contains form data

    if (req.file) {
      const {filename} = req.file
      post.photo_path = `/uploads/${filename}`
    }

    kx('posts')
      .update(post)
      .where({id})
      .then(() => res.redirect(`/posts/${id}`))
      .catch(error => next(error))
  }
}

module.exports = PostsController





// bump
