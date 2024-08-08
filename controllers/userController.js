import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      role,
      shopCategory,
      shopName,
      shopAddress,
      GST,
    } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).send({ status: "failed", message: "email already exist" });
    } else {
      const GenSalt = 10;
      const hashPassword = await bcrypt.hash(password, GenSalt);
      const Doc = new userModel({
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        email: email,
        password: hashPassword,
        role: role,
        shopCategory: shopCategory,
        shopName: shopName,
        shopAddress: shopAddress,
        GST: GST,
      });
      await Doc.save();
      return res
        .status(201)
        .send({ status: "success", message: "create user successfully" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).send({
      status: "failed",
      message: "All fields are required",
    });
  }

  try {
    // Find the user by email
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        status: "failed",
        message: "You are not a registered user, please register",
      });
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).send({
        status: "failed",
        message: "Email and password do not match",
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ userid: user._id }, process.env.SECRETKEY, {
      expiresIn: "1d",
    });

    // Send response with token
    return res.status(200).send({
      status: "success",
      message: "User login successfully",
      jwtToken,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};





// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (email && password) {
//       const user = await userModel.findOne({ email: email });
//       if (user) {
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (user.email == email && isPasswordMatch) {
//           const findUser = await userModel.findOne({ email: email });

//           const jwtToken = jwt.sign(
//              {findUser} ,
//             process.env.SECRETKEY,
//             {
//               expiresIn: "1d",
//             }
//           );
//           console.log(jwtToken);

//           return res
//             .status(201)
//             .send({
//               status: "success",
//               message: "user login successfully",
//               jwtToken,
//             });
//         } else {
//           return res.status(400).send({
//             status: "failed",
//             message: "email and password doesnot match",
//           });
//         }
//       } else {
//         return res.status(400).send({
//           status: "failed",
//           message: "you are not register user please register",
//         });
//       }
//     } else {
//       return res
//         .status(400)
//         .send({ status: "failed", message: "all field are required" });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const updateUserById = async (req, res) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    role,
    shopCategory,
    shopName,
    shopAddress,
    GST,
  } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(user);
    if (user) {
      console.log(user);
      return res
        .status(201)
        .send({ status: "success", message: "user update successfully" });
    } else {
      return res
        .status(400)
        .send({ status: "failed", message: "user not found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      status: "failed",
      message: "an error occured whilr updating the user",
    });
  }
};

const getUsers = async (req, res) => {
  const users = await userModel.find();
  try {
    if (users) {
      return res.status(201).send({
        status: "success",
        message: "get all users successfully",
        users,
      });
    } else {
      return res.status(500).send({
        status: "failed",
        message: "an error occured whilr updating the user",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  console.log(req.user);
  const findUser = await userModel.findByIdAndDelete({ _id: req.params.id });
  if (findUser) {
    return res.status(201).send({
      status: "success",
      message: "user delete successfully",
    });
  } else {
    return res.status(201).send({
      status: "failed",
      message: "user not found",
    });
  }
};


export const logoutUserController = (req, res) => {
  try {
    if (req.session && req.session.user) {
      localStorage.removeItem("token");

      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ error: "Unable to logout user." });
        } else {
          res.status(200).json({ message: "User logged out successfully." });
        }
      });
    } else {
      res.status(401).json({ error: "User not authenticated." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
   }
}

export { createUser, loginUser, updateUserById, getUsers, deleteUser,logoutUserController };
