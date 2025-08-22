const jsonweb = require("jsonwebtoken"); 
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

exports.Verify = (token)=>{
  const verify = jsonweb.verify(token,JWT_SECRET);
  console.log(verify,"verify");
  return verify;
  
}