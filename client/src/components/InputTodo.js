import React, { useState } from 'react'

function InputTodo() {
    const [description, setdescription] = useState("")
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            await fetch("http://localhost:8081/todos",{
                method : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

        window.location = "/";
        } catch (error) {
            
        }
    }
  return (
    <>
        <h1>Pern Todo</h1>
        <form onSubmit={onSubmitForm}>
            <input type='text' value={description} onChange={e=>setdescription(e.target.value)}/>
            <button>Add</button>
        </form>
    </>
  )
}

export default InputTodo