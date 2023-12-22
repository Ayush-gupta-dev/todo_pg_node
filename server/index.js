const express = require("express");
const app = express()
const pool =require("./db")
const cors= require("cors")
const PORT = 8081;  


//middlewares
app.use(cors())
app.use(express.json())

//routes//

//create a todo

//in post request client is sending data in body 
// const response = await fetch("http://localhost:8081/todos", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body)
//   });
app.post("/todos",async (req,res)=>{
    try {
        const {description} = req.body;
        console.log(description);
        const newTodo = await pool.query(
            "INSERT INTO todo(description) values($1) returning * ", [description]
        );
        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

//get all todos

app.get("/todos",async (req,res)=>{
    try {
        const allTodos = await pool.query("select * from todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.log(error);
    }

})

//get a todo

app.get("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query("select * from todo where todo_id= $1",[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error);
    }
})

//update a todo

app.put("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body
        const updateTodo = await pool.query("update todo set description =$1 where todo_id=$2",[description,id])
        res.json("todo was updated")
    } catch (error) {
        console.log(error);
    }
})

//delete a todo
app.delete("/todos/:id", async (req,res)=>{
    try {
        const {id} =req.params;
       await pool.query("delete from todo where todo_id=$1",[id])
        res.json("todo was deleted")
    } catch (error) {
        
    }
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
}) 