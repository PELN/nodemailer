
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'admin', password: 'root'},
        {email: 'rowValue2', password: 'password'},
        {email: 'rowValue3', password: 'password'}
      ]);
    });
};
