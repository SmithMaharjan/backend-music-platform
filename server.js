import app from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./src/config/database.js"
dotenv.config()
connectDB()
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`the server is running at port ${PORT}`)
});