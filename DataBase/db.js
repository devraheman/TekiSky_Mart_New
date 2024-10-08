import mongoose from 'mongoose'

const connectDB = async (DATABASE_URL)=>{
try {
    await mongoose.connect(DATABASE_URL)
    console.log('data base connected succesfully');
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}
} 

export default connectDB 