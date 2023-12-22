import React, { useState,useEffect } from 'react'
import EditTodo from './EditTodo';


function ListTodo() {

    const [todos, settodos] = useState([])
    // const deleteTodo = async()=>{} or
    async function deleteTodo(id){
        try{
            await fetch(`http://localhost:8081/todos/${id}`,{
            method: "DELETE"
        })
        //problem occuring in render part if filtering
       // settodos(todos.filter(e=>e.todo_id!==id));
        window.location = "/";
        }catch(e){
            console.log(e);
        }

    }
    const getTodos= async()=>{
        try {
            const response = await fetch("http://localhost:8081/todos");
            const jsonData = await response.json()
            settodos(jsonData)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
     getTodos()
    }, [])
    
  return (
    <>
    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {todos.map(todo=>(
                <tr kry = {todo.todo_id}>
                    <td>
                        {todo.description}
                    </td>
                    <td>
                        <EditTodo todo={todo}/>
                    </td>
                    <button onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default ListTodo