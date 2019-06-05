import config from './config'

const mysql = require('promise-mysql')

const dbconfig = {
	host: config.host,
	port: config.port,
	user: config.user,
	password: config.password,
	database: config.database,
	connectionLimit: config.connectionLimit,
};

const pool = mysql.createPool(dbconfig);

module.exports = pool