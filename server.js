const express = require('express');
const app = express();
const todoService = require('./services/todoService');
const bodyParser = require('body-parser')

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Todo home screen, to be built in react');
});


app.post('/todo',async (req,res)=>{
  // create a todo
  let result = await todoService.creatTodo(req.body.title, req.body.description);
  res.json(result);
})

app.get('/todos',async (req,res)=>{
  // get all todos
  const notes = await todoService.getTodos();
  res.json(notes);
})

app.put('/todo/:id',async (req,res)=>{
  //update a todo
  let todo = {id: req.params.id, title:req.body.title, description: req.body.description};
  let result = await todoService.updateTodo(todo);
  res.json(result);
});

app.delete('/todo/:id',async (req,res)=>{
  //delete a post
  let result = await todoService.deleteTodo(req.params.id);
  res.json(result);
});


const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`)
});