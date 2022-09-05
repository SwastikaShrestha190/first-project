import React, { useEffect, useState } from 'react'
import './Todo.css'

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('lists')) || [])

    useEffect(()=> {
        localStorage.setItem('lists', JSON.stringify(todos));
    }, [todos]);

    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem('lists'));
        if(data){
            setTodos(data);
        }
    }, []);

    function handleSubmit(){
        setTodos([...todos, inputData])
        setInputData('')
    }

    function deleteAll(){
        setTodos([])
    }

    function Edit(index){
            const newTodos = [...todos]
            newTodos.splice(index, 1, inputData)
            setTodos(newTodos)
            setInputData(todos[index])
     }

    function Delete(index){
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

  return (
        <div class="container">
            <h3 class="logo">Todo App</h3>
            <input 
                type="text" 
                class ="input" 
                placeholder='Enter the Items' 
                value={inputData}
                onChange = {(e) => setInputData(e.target.value)}
                >
            </input>
            <button 
                class="button"
                onClick = {handleSubmit}
                disabled = {!inputData}>Add Todo</button>
            <h3 class="todo-list">To Do Lists</h3>
            <ul class="list">
                {todos.map((todo) => (
                <li>{todo}
                <button
                    onClick={()=>Edit(todos.indexOf(todo))}>
                        Edit</button>
                <button onClick={()=>Delete(todos.indexOf(todo))}>Delete</button>
                </li> ))}
            </ul>
            <button
                class="remove"
                onClick= {deleteAll}>Remove All</button>
        </div>
    )
}

export default Todo