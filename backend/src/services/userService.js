const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository')
const jwt = require('jsonwebtoken')
const registration = async(name,email,password)=>{
   email=email.toLowerCase()
   const data = await userRepository.findUserByEmail(email)
   if(data){
      return "User already exists"
   }
   const password_hash = await bcrypt.hash(password,10);
   return userRepository.createUser(name,email,password_hash)
}

const loginuser = async(email,password) =>{
   email=email.toLowerCase()
   const user = await userRepository.findUserByEmail(email)
   if(user){
      const match = await bcrypt.compare(password,user.password_hash)
      if(match){
         const token = jwt.sign(
            {userId: user.id},process.env.JWT_SECRET,{expiresIn: "1d"}
         );
         

         return {
            token,
            user:{
               id:user.id,
               name:user.name,
               email: user.email
            }
         };
      }
      else{
         throw new Error("Invalid email or password")
      }
   }
   else{
      throw new Error("Invalid email or password")
   }
}

module.exports = {registration,loginuser}