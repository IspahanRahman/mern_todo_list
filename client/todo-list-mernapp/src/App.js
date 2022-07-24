import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';

function App() {
  const [itemText,setItemText]=useState('')
  const [listItems,setListItems]=useState([])
  const [isUpdating,setIsUpdating]=useState('')
  const [updateItemText,setUpdateItemText]=useState('')

  const addItem=async(e)=>{
    e.preventDefault()
    try{
      const result=await axios.post('http://localhost:8080/api/item',{item:itemText})
      setListItems(prev=>[...prev,result.data])
      setItemText("")
    }catch(e){
      console.log(e)
    }
    
  }

useEffect(()=>{
  const getAllItems=async(req,res)=>{
   try{
    const result=await axios.get('http://localhost:8080/api/items')
    setListItems(result.data)
    console.log(result.data)
   }
   catch(e){
    console.log(e)
   }
  }
  getAllItems()
},[])

const deleteItem=async(id)=>{
  try{
    const result=await axios.delete(`http://localhost:8080/api/item/${id}`)
    const newItemList=listItems.filter(item=>item._id!==id)
    setListItems(newItemList)
    console.log(result)
  }catch(e){
    console.log(e)
  }
}
const updateItem=async(e)=>{
  try{
    const result=await axios.put(`http://localhost:8080/api/item/${isUpdating}`,{item:updateItemText})
    console.log(result)
    const updatedItemIndex=listItems.findIndex(item=>item._id===isUpdating)
    const updatedItem=listItems[updatedItemIndex].item=updateItemText
    console.log(updatedItem)
    setUpdateItemText('')
    setIsUpdating('')
    
  }catch(e){
    console.log(e)
  }
}
  const handleChange=(e)=>{
    setItemText(e.target.value)
  
  }
const rerenderUpdateform=(value)=>(
  <form onSubmit={(e)=>{updateItem(e)}}>
    <input type='text' placeholder={value} onChange={(e)=>{setUpdateItemText(e.target.value)}} value={updateItemText}/>
    <SyncIcon className='update' onClick={()=>{updateItem()}}/>
  </form>
)

  return (
    <div className="main_div">
      <div className='center_div'>
          <h1>Todo List</h1>
          <form onSubmit={e=>addItem(e)}>
            <input type="text" placeholder="Add Todo Item" onChange={handleChange} value={itemText}/>
            <Button className='newBtn' type="submit"><AddIcon/></Button>
          </form>
          <div className="todo-listItems">
            {
              listItems.map(item=>(
                <div className="todo_style">
                {
                  isUpdating===item._id ? rerenderUpdateform(item.item)
                  :<>
                  <p className="item_content">{item.item}</p>
                  <SyncIcon className='update' onClick={()=>{setIsUpdating(item._id)}}/>
                  <Delete className="fa fa-times" onClick={()=>{deleteItem(item._id)}}/>
                  </>
                }
                
                </div>
              ))
            }
          </div>
      </div>
    </div>
  );
}

export default App;
