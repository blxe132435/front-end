const mysql = require("mysql2/promise");

const db = async () =>
	await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "todo_app"
	});

module.exports = db;