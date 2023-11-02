const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5433,
    database: 'todoapp'
})

module.exports = pool