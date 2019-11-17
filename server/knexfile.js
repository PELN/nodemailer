const credentials = require('./mysql_config/mysql_credentials');
const knexSnakeCaseMappers = require('objection').knexSnakeCaseMappers;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      user: credentials.user,
      password: credentials.password,
      port: 8889
    },
    ...knexSnakeCaseMappers()
  },
}