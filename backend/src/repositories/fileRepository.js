const pool = require("../config/database");

const createFile = async (userId, originalName, storedName, fileType, fileSize, filePath) => {
  const result = await pool.query(
    `INSERT INTO files (user_id, original_name, stored_name, file_type, file_size, file_path)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, original_name, file_type, file_size, created_at`,
    [userId, originalName, storedName, fileType, fileSize, filePath]
  );
  return result.rows[0];
};

const getFilesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT id, original_name, file_type, file_size, created_at
     FROM files WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};
const getFileById = async(fileId,userId) => {
   const result = await pool.query(
    `select * from files where user_id = $1 and id = $2`
    ,[userId,fileId]
   )
   return result.rows[0]
}

const deleteFileById = async(fileId,userId) => {
  const result = await pool.query(
    `delete from files
    where id=$1 and user_id=$2 RETURNING id, file_path`,[fileId,userId]
  )
  return result.rows[0];
}
const getStorageUsageByUser = async (userId) => {
  const result = await pool.query(
    `SELECT
       COALESCE(SUM(file_size), 0) AS used_bytes,
       COUNT(*) AS total_files
     FROM files
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};
module.exports = { createFile, getFilesByUser,getFileById,deleteFileById,getStorageUsageByUser };