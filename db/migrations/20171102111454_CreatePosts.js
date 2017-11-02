
exports.up = function(knex, Promise) {
  // When creating migrations, you must return a Promise. Otherwise,
  // knex will not when the migration is complete. It waits until the promise
  // is resolved to continue.
  return knex.schema.createTable('posts', table => {
    table.increments('id')
    table.string('username')
    table.text('content')
    table.string('photo_path')
    table.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  // The for down should hold a knex query that reverts changes made in `up`.
  // This is the rollback.
  return knex.schema.dropTable('posts')
};
