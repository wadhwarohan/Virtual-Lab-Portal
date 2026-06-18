import express from "express";
import cors from "cors";

import "dotenv/config"
import multer from "multer";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

const app=express()
const PORT = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

//Route
app.get("/",(req,res)=>{
    res.send("Server is Running")
})
app.use("/api/auth",authRouter)
app.use("/api/employees",employeesRouter)
app.use("/api/profile",profileRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/dashboard",dashboardRouter)


await connectDB()
app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})