const kx = require('../db/connection')

const CommentsController = {
  create (req, res, next) {
    const {postId} = req.params
    const {content} = req.body

    kx
      .insert({content, postId})
      .into('comments')
      .then(() => res.redirect(`/posts/${postId}`))
      .catch(error => next(error))
  }
}

module.exports = CommentsController
