const pool = require("../config/database")

const createNotes = async(userId,title,content,isPinned)=>{
    const result = await pool.query(
        `insert into notes(user_id,title,content,is_pinned) values($1,$2,$3,$4)
         returning *
        `,[userId,title,content,isPinned]
    )
    return result.rows[0];
}
const getNotesByUser = async(userId)=>{
    const result = await pool.query(
        `select * from notes where user_id=$1
        `,[userId]
    )
    return result.rows;
}

module.exports = {createNotes,getNotesByUser}