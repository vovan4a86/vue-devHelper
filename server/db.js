const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
             id integer PRIMARY KEY,
             name text,
             email text UNIQUE,
             user_pass text,
             favorites text,
             likes text,
             is_admin bool   
            )`
        return this.db.run(sql)
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email], function(err, row) {
            callback(err, row)
            })
    }
    selectById(id, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE id = ?`,
            [id], function(err, row) {
            callback(err, row)
            })
    }


    insertAdmin(user, callback) {
        return this.db.run(
            `INSERT INTO user (name, email, user_pass, is_admin) VALUES (?,?,?,?)`,
            user, (err) => {
            callback(err)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function (err, rows) {
            callback(err, rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            `INSERT INTO user (name, email, user_pass, is_admin) VALUES (?,?,?,?)`,
            user, (err) => {
                callback(err)
            }
        )
    }

    updateFavorites(favorites, id, callback) {
        return this.db.run(`
            UPDATE user
            SET favorites = ?
            WHERE id = ?
        `, favorites, id, (err) => {
            callback(err)
        })
    }
    updateLikes(likes, id, callback) {
        return this.db.run(`
            UPDATE user
            SET likes = ?
            WHERE id = ?
        `, likes, id, (err) => {
            callback(err)
        })
    }
}
module.exports = Db
