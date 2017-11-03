
exports.up = async function(knex, Promise) {
  await knex.schema.alterTable('comments',  table => {
    table.integer('userId').references('users.id').onDelete('SET NULL')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.alterTable('comments',  table => {
    table.dropColumn('userId')
  })
};
