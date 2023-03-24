try{
  const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.listen(3000, () => {
 console.log("Server started on port 3000")
})
mongoose.connect("mongodb+srv://ham25:Sapra2601$@cluster0.ckehovm.mongodb.net/ToDo?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
})


const bodyParser = require('body-parser')
 app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

let todoModel = require('./todo_schema')


app.post('/todo/add', (req, res) => {  

    let nnewTodo = new todoModel;  
    nnewTodo.title = req.body.todo; 
     nnewTodo.completed = false; 
    let t=  nnewTodo.save();
    console.log(t);
    t.then(()=>{
      res.send("Added"); 
console.log("success")
    })
    
 } )




        app.get('/todo/completed', (req, res) => { 
             todoModel.find({completed:true}).then ((data,err)=>  {  
                   if (err) {      
                       res.send("Error while fetching Todos");  
                      } else {   
                             res.json(data)    } 
                             })
                            })       


     app.get('/todo/uncompleted', (req, res) => {  
         todoModel.find({completed:false}).then ((data,err)=>  {  
          if (err) {      
              res.send("Error while fetching Todos");  
             } else {   
                    res.json(data)    } 
                    })
                   })                    

     app.post('/todo/complete/:id',(req, res) => {
          todoModel.findByIdAndUpdate(req.params.id, {completed: true}).then(
                   (data,err) =>{    if(!err){  
                    console.log("updated")
                           res.send("Good Work");    } 
                         })
                        })    
                        
                        app.post('/todo/uncomplete/:id',(req, res) => {
                          todoModel.findByIdAndUpdate(req.params.id, {completed: false}).then(
                                   (data,err) =>{    if(!err){  
                                    console.log("updated")
                                           res.send("Good Work");    } 
                                         })
                                        }) 

                                        app.post('/todo/update/:id',(req, res) => {
                                          todoModel.findByIdAndUpdate(req.params.id, {title: false}).then(
                                                   (data,err) =>{    if(!err){  
                                                    console.log("updated")
                                                           res.send("Good Work");    } 
                                                         })
                                                        }) 

          app.delete('/todo/:id', (req, res) => { 
               let query = { _id: req.params.id }
                 todoModel.deleteOne(query).then((err) => {  
                       if(err){      res.send("Error while deleting todo")   
                     }else{  
                             res.send("Todo deleted") ;
                            console.log("Deleted")  }
                              })
                            })                       
                          }catch(err){
console.log(err);
                          }