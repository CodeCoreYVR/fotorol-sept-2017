const kx = require('../db/connection')

const CommentsController = {
  create (req, res, next) {
    const {postId} = req.params
    const {content} = req.body
    const {currentUser} = req

    kx
      .insert({content, postId, userId: currentUser.id})
      .into('comments')
      .then(() => res.redirect(`/posts/${postId}`))
      .catch(error => next(error))
  }
}

module.exports = CommentsController
