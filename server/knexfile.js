const credentials = require('./mysql_config/mysql_credentials');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      user: credentials.user,
      password: credentials.password,
      port: 8889
    }
  }
}