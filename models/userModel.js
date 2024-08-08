import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  shopCategory: { type: String, required: true },
  shopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  GST: { type: String, required: true },
});

// userSchema.pre('save', async function(next){
// next()
// })

const userModel = new mongoose.model("user", userSchema);

export default userModel;
