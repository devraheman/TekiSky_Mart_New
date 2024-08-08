import jwt from "jsonwebtoken";
export const userAuthentication = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(400).send({ message: "Access Denied Invalid Token" });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.SECRETKEY);

    req.user = decodedUser;
    console.log(req.user);
    next();
  } catch (error) {
    res.send(error.message);
  }
};
