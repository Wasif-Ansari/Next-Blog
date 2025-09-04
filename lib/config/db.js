import mongoose from "mongoose";

//1 make connext db function

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");

}