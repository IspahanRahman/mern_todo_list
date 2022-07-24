const todoItemModel=require('../models/todoItems')

exports.addTodoItemConterller=async(req,res)=>{
    try{
        const newItem=new todoItemModel({
            item:req.body.item
        })
        const saveItem=await newItem.save()
        res.status(200).json(saveItem)
    }
    catch(e){
        console.log(e)
    }
}

exports.getAllTodoItemController=async(req,res)=>{
    try{
        const allTodoItems=await todoItemModel.find({})
        res.status(200).json(allTodoItems)
    }catch(e){
        console.log(e)
    }
}

exports.editTodoItemController=async(req,res)=>{
    try{
        let item=req.params.id
        console.log(item)
        const updateItem=await todoItemModel.findByIdAndUpdate(item,{
            item:req.body.item
        })
        console.log(updateItem)
        res.status(200).json('Item is updated')
    }catch(e){
        console.log(e)
    }
}

exports.deleteTodoItemController=async(req,res)=>{
    try{
        const deleteItem=await todoItemModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Item is deleted")
    }catch(e){
        console.log(e)
    }
}