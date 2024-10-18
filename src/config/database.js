import mongoose from "mongoose";
export const connectDB = async () => {
    const MONGODB_URL = process.env.MONGODB_URL


    try {
        await mongoose.connect(MONGODB_URL)
        console.log("connected to database")

    }
    catch (error) {
        console.log("something went wrong while connecting to the database", error)

    }

}