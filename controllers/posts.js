const kx = require('../db/connection')

const PostsController = {
  index (req, res, next) {
    console.log(req.session)
    kx
      .select()
      .from('posts')
      .orderBy('created_at', 'DESC')
      .then(posts => res.render('posts/index', {posts}))
  },
  /*
  show (req, res, next) {
    const {id} = req.params

    Promise.all([
      kx
        .first()
        .from('posts')
        .where({id}),
      kx
        .select()
        .from('comments')
        .where({postId: id})
        .orderBy('created_at', 'DESC')
    ])
      .then(([post, comments]) => res.render('posts/show', {post, comments}))
      .catch(error => next(error))
  },
  */
  // NEW KEYWORD `async`
  // You can putting `async` in front methods, functions and arrow functions.
  // This will make that function treat promises differently. The keyword
  // `await` will become available which allows you to tell the program
  // to wait for a promise to resolve getting its promiseValue instead of
  // the promise itself.

  // `async` functions always return a promise where the return value is promise
  // value.
  async show (req, res, next) {
    const {id} = req.params

    try {
      const post = await kx.first().from('posts').where({id})
      const comments = await kx
        .select().from('comments').where({postId: id}).orderBy('created_at', 'DESC')

      res.render('posts/show', {post, comments})
    } catch (error) {
      next(error)
    }
  },
  create (req, res, next) {
    const {content, username} = req.body;
    const {filename} = req.file;


    kx
      .insert({content: content, username: username, photo_path: `/uploads/${filename}` })
      .into('posts')
      .then(() => {
        // When setting the type of flash message, try using alert types
        // that are available in Boostrap because we've connected together.
        // Each type will display in a different color
        req.flash('success', 'Post Created!')
        // req.flash('warning', 'Don\'t go there')
        // req.flash('danger', 'Danger! Danger, Will Robinson!')

        res.redirect('/posts')
      })
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
