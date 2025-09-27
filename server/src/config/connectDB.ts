import mongoose from "mongoose";

const connectDB = async (mongoURL: string) => {
    try {
        await mongoose.connect(mongoURL);
        console.log(`Data base connected successfully in - ${mongoURL}`)
    } catch (error) {
        console.log(`Data base connection failed`);
    }
}

export default connectDB;