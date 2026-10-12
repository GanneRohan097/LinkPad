const pool = require('../config/database');

const createUser = async(name,email,password_hashed) =>{
    const result = await pool.query(`
            insert into users(name,email,password_hash) values($1,$2,$3)
            returning id,name,email
        `,[name,email,password_hashed])
    return result.rows[0];
}

const findUserByEmail = async(email) =>{
    const result = await pool.query(
        `select * from users where email=$1`,[email]
    )
    return result.rows[0];
}

module.exports = {createUser,findUserByEmail}