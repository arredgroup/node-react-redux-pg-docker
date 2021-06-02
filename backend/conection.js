const { Pool } = require("pg");

const connectionData = new Pool({
    user: 'user_admin',
    host: 'postgres',
    database: 'db',
    password: 'password_admin',
    port: 5432,
});

  module.exports = connectionData;