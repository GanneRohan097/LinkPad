const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await userService.registration(name, email, password);

    if (result === "User already exists") {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      
    });
  }
};

const loginuser = async(req,res)=>{
  const {email,password} = req.body
  try{
  const result = await userService.loginuser(email,password)
   res.status(200).json({
     message: "Login success",
     user: result
   })
  }
  catch(err){
      res.status(400).json({
        message:"Login failed",
      })
  }

}
const me = (req, res) => {
  res.status(200).json({ success: true, userId: req.userId })
}


module.exports = { createUser ,loginuser,me};