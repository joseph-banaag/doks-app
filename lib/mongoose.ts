import mongoose from "mongoose"

let isConnected = false // this variable will check the connection status of the application to mongoose

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // this will prevent unknown field queries

    if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found")
    if (isConnected) return console.log("You are already connected to MONGODB")
    
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        isConnected = true;
        console.log("Connected to MONGODB")

    } catch (error) {
        console.log(error)
    }
}