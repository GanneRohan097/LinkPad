const notesService = require("../services/notesServices")

const createNotes = async(req,res)=>{
    const {title,content,ispinned} = req.body;
    const response = await notesService.createNotes(req.userId,title,content,ispinned);
    if(response){
          res.json({
            "Status":"Ok",
            "Message":"File created",
            "Result": response
        })
    }
    else{
        res.json({
            "Status":"Failed",
            "Message":"File not created!",
        })
    }
}
const getNotesByUser = async(req,res)=>{
    console.log("UserId:",req.userId)
    const result = await notesService.getNotesByUser(req.userId);
    res.json({
        success: true,
        notesList: result
    })
}
module.exports = {createNotes,getNotesByUser}