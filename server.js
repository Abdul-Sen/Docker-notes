const express = require('express');
const app = express();
const todoService = require('./services/todoService');
const bodyParser = require('body-parser')

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World, this is ABDUL from docker');
});


app.post('/todo',(req,res)=>{
  // create a todo
  console.log(req.body);
})

app.get('/todos',async (req,res)=>{
  // get all todos
})

app.post('/todo',(req,res)=>{
  //update a post
});

app.delete('/todo',(req,res)=>{
  //delete a post
});


const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`)
});