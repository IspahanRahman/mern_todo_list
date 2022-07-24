const mongoose=require('mongoose')

const TodoItemSchema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    }
},
{
    timestamps:true, 
}
)

module.exports=mongoose.model('todo',TodoItemSchema)