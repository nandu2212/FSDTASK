const express=require('express');
const mongoose=require('mongoose')
const itemModal=require('./model/Activity')

const cors = require('cors');

const app=express()
app.use(express.json())
app.use(cors())

app.listen(3082,()=>{
    console.log('port listened')
})
// db connection
mongoose.connect('mongodb+srv://chinni:chinni@cluster0.6dkm45w.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('connected to db')
})
//posting the data
app.post('/Add',async(req,res)=>{
   await itemModal.create({activity:req.body.activity}).then((user)=>{
    res.json(user)
   }).catch((err)=>{
    res.send(err)
   })
})
//getting all data
app.get('/',async(req,res)=>{
    try{
        const users=await itemModal.find()
        res.json(users)

    }
    catch(err){
        res.send(err)
    }
  })


  
  
  //update item
  app.put('/:id', async (req, res)=>{
    try{
      //find the item by its id and update it
      const updateItem = await itemModal.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json(updateItem);
    }catch(err){
      res.json(err);
    }
  })
  
  
  //Delete item from database
  app.delete('/:id', async (req, res)=>{
    try{
      //find the item by its id and delete it
      const deleteItem = await itemModal.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  })
  