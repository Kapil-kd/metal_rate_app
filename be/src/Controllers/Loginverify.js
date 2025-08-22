const User = require("../models/User");
const { Verify } = require("../utils/Verify");

exports.Loginverify = async(req,res)=>{
    try {
        console.log(req.headers.authorization,"tokn")

        const token = req.headers.authorization.split(' ')[1];

        const verify = Verify(token);
        
        if(verify.userId){
            const verifydata = await User.findById(verify.userId)
            console.log(verifydata,"verifydata");
            if(verifydata){
            return res.status(200).json({msg:"success",code:200})
            }
             return res.status(200).json({msg:"not a valid user"})
        }

        return res.status(200).json({msg:"not a valid token"})
        
    } catch (error) {
        return res.status(200).json({msg:"Internal server error",code:500})
    }
}