import React, { useEffect, useState, useContext } from 'react';
import '../scss/new-todo.scss';
import { ToDoContext } from '../context/todos-context';
import { ToDoCopyContext } from '../context/todos-copy-context';



const NewTodo = () => {
    const [taskValue, setTaskValue] = useState('');
    const [todos, setTodos] = useContext(ToDoContext);
    const [todosCopy, setTodosCopy] = useContext(ToDoCopyContext);


    const addNewTodo = (e) => {
        if (e.key === 'Enter') {
            let temp = [...todos];
            let newTodo = { id: temp.length + 1, text: taskValue, done: false };
            temp.push(newTodo);
            setTodos(temp);
            setTodosCopy(temp);
            setTaskValue('');
        }
    }

    const handleInputChange = (e) => {
        setTaskValue(e.target.value);
    }


    return (

        <div className="new-todo">
            <div className="circle-wrap">
                <div className="circle"></div>
            </div>

            <input type="text" className="new-todo-input" placeholder="Enter a new todo" value={taskValue} onKeyPress={(e) => addNewTodo(e)} onChange={(e) => handleInputChange(e)} />
        </div>

    );
}

export default NewTodo;