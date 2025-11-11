import express from "express"
import dotenv from "dotenv"
import notificationRoutes from "./routes/notification.routes.js"


dotenv.config()



const app = express()

app.use(express.json());
app.use("/", notificationRoutes)

const PORT = process.env.PORT


app.listen(PORT , ()=>{
    console.log(`server is running in Port ${PORT}`)
})