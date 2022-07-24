const express=require('express')
const dotenv=require('dotenv').config()
require('./database/dbconnections')
const cors=require('cors')
const TodoItemRoute=require("./routes/todoItemsroute")

const app=express()

app.use(express.json())
app.use(cors())

const PORT=process.env.PORT || 8080

app.use("/",TodoItemRoute)

app.listen(PORT,()=>{
    console.log(`Server is connected to port ${PORT}`)
})
