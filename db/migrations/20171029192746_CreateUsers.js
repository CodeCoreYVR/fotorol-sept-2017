
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    // .increments creates a column that auto increments. It's argument is
    // a string that represents the name of the column.
    table.increments('id')
    table.string('email').unique().notNull()
    table.string('username').unique().notNull()
    table.string('passwordDigest').notNull()
    // .timestamps creates to timestamp columns named `created_at` and
    // `updated_at` using the type `timestampz` (includes time zone).
    table.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users') 
};
