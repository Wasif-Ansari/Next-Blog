import mongoose from "mongoose";

//1 make connext db function

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://michael:I4nODeEHuO1h3jQW@cluster0.7rx08xg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB connected");

}