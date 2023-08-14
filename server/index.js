const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const cors = require("cors")
const connectDB = require("./config/db")
const user = require("./routes/api/user");
const Admin = require("./routes/api/Admin");


const app = express()
connectDB()
app.use(express.json())
app.use(cors())

app.get("/example",(req,res)=>{
    res.send("this is an example route")
})
app.use("/api/user", user);
app.use("/api/admin",Admin)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})