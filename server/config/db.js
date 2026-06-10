import mongoose from "mongoose"

 export async function initDB() {
    try {
        console.log("URI being used:", process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/frameit")
        console.log("MongoDB Connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
