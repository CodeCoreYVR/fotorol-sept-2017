
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments('id')
    table.text('content')
    table.integer('postId').references('posts.id').onDelete('CASCADE')
    table.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
