const mongoose=require('mongoose')
const dotenv=require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database is connected")
})
.catch((e)=>{
    console.log(e)
})