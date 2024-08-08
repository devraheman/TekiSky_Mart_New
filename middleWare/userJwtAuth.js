import jwt from 'jsonwebtoken';

// export const UserAuthentication = async (req, res, next) => {
//   // Extract token from the 'Authorization' header
//   const authHeader = req.header('Authorization');
  
//   // Check if token exists
//   if (!authHeader) {
//     return res.status(400).send({ message: "Unauthorized user" });
//   }

//   // Extract the token and handle possible "Bearer " prefix
//   const token = authHeader.startsWith('Bearer') ? authHeader.slice(7) : authHeader;

//   try {
//     // Verify the token
//   jwt.verify(token, process.env.SECRETKEY, (err, user) => {
//     if (err) {
//       return res.status(401).send({ message: "Access Denied Invalid Token" });
//     }
    
//     // Attach user to the request object
//     req.user = user;

//     // Continue to the next middleware or route handler
//     next();
//   });
//   } catch (error) {
//     return res.status(403).send({ message: "Access Denied Invalid Token 12" });

//   }
// };



// for creating jwt  only in login 
// export const authentication = async(req,res,next)=>{
//   console.log(newtoken);
//  next()
//  }






 export const userAuthentication = async(req,res,next)=>{
const token =  req.headers['authorization']
if (!token){
 res.status(400).send({message :"Access Denied Invalid Token"})
}
try {
  const decodedUser =  jwt.verify(token, process.env.SECRETKEY, )

req.user = decodedUser
console.log(req.user);
next()
} catch (error) {
  res.send(error.message)
}
}