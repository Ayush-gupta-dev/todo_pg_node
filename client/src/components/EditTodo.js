import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setdescription] = useState(todo.description)
    const updateDescription = async(e)=>{
        e.preventDefault()
        try {
            const body = {description}
            await fetch(`http://localhost:8081/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(body)
            })
            window.location="/";
        } catch (error) {
            
        }
    }

  return (
    <>
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
    <button style={{marginInline:"5px"}} onClick={(e) => updateDescription(e)}>Edit</button>
      </div>
    </>
  );
};

export default EditTodo;
