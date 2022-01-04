const Pool = require('pg').Pool

const pool = new Pool({
	user: 'postgres',
	password: 'gigaw',
	host: 'localhost',
	port: 5432,
	database:  'user_tags'
})

module.exports = pool