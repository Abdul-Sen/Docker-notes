const Sequelize = require('sequelize');
require('dotenv').config();

var sequelize = null;
async function auth(){
  let tries = 5;
  while (tries != 0)
  {
    try{
      sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASS}@${process.env.DOCKER_DB_SERVICE}:${process.env.DOCKER_DB_PORT}/${process.env.DOCKER_DATABASE_NAME}`);
      let result = await sequelize.authenticate();
      console.log(result);
      break;
    }
    catch(err)
    {
      tries -= 1;
      console.log(`tries left: ${tries}`);
      console.log(`waiting 5 seconds`);
      await new Promise(res => setTimeout(res,5000));
    }
  }
}

auth().then(()=>{
  console.log(`successfully connected to database`);

  sequelize.sync().then(function () {
    console.log(`database synced. DB operations now ready to work`);
  });

}).catch((err)=>{
  console.log(`failed to connect to database`);
  console.log(err);
})

// Define a "Todo" model
const Todo = sequelize.define('Todo', {
  title: Sequelize.STRING,
  description: Sequelize.STRING
});

//Crud
module.exports.creatTodo = async (inputTitle, inputDescription)=>{ // {title:"",description:""}
 let result = await Todo.create({title: inputTitle, description: inputDescription});
 return result;
}

// cRud
module.exports.getTodos = async ()=>{
  // Todo.findAll({})
 const notes = await Todo.findAll();
 return notes;
}

module.exports.updateTodo = async (todo)=>{
  // Update todo
 let result = await Todo.update({...todo},{where:{id: todo.id}});
  return result;
}

module.exports.deleteTodo = async (itemId)=>{
 let result = await Todo.destroy({
    where: {
      id: itemId
    }
  });
  
  return result;
}