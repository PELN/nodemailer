
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
        table.increments('id');
        table.string('email').unique();
        table.string('password');
    })
    .createTable('emails', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('from');
        table.string('to');
        table.string('subject');
        table.string('html');
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('emails');
};
