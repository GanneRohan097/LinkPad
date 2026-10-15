const notesRepository = require("../repositories/notesRepository")

const createNotes = async(user_id,title,content,ispinned)=>{
   return await notesRepository.createNotes(user_id,title,content,ispinned);
}

const getNotesByUser = async(user_id) => {
    return await notesRepository.getNotesByUser(user_id)
}

module.exports = {createNotes,getNotesByUser}