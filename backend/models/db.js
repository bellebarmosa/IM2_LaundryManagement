// models/db.js
const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "basket1_pos",
});

db.beginTransactionAsync = util.promisify(db.beginTransaction);
db.queryAsync = util.promisify(db.query);
db.commitAsync = util.promisify(db.commit);
db.rollbackAsync = util.promisify(db.rollback);

module.exports = db;