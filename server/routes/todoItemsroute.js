const router=require('express').Router()
const {
    addTodoItemConterller,
    getAllTodoItemController,
    editTodoItemController,
    deleteTodoItemController
}=require("../controllers/todoItemController")

router.post('/api/item',addTodoItemConterller)
router.get('/api/items',getAllTodoItemController)
router.put('/api/item/:id',editTodoItemController)
router.delete('/api/item/:id',deleteTodoItemController)

module.exports=router