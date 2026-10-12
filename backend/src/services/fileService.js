const fileRepository = require("../repositories/fileRepository");

const uploadFile = (userId, file) =>
  fileRepository.createFile(
    userId,
    file.originalname,
    file.filename,
    file.mimetype,
    file.size,
    file.path
  );

const listFiles = (userId) => fileRepository.getFilesByUser(userId);
const downloadFile = async(userId, fileId)=>{
   const result = await fileRepository.getFileById(fileId,userId)
   if(!result){
      return null;
   }
   return result;
}

const deleteFile = async(userId, fileId)=>{
   const result = await fileRepository.deleteFileById(fileId,userId)
   if(!result){
      return null;
   }
   return result;
}
module.exports = { uploadFile, listFiles,downloadFile,deleteFile };