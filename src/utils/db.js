import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection failed", error);
    }
}
export default connection;