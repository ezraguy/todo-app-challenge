import React, { useEffect, useState, useContext } from 'react';
import '../scss/new-todo.scss';
import { ToDoContext } from '../context/todos-context';



const NewTodo = () => {
    const [taskValue, setTaskValue] = useState('');
    const [todos, setTodos] = useContext(ToDoContext);



    const addNewTodo = (e) => {
        if (e.key === 'Enter') {
            let temp = [...todos];
            let max = 0;
            for (let index = 0; index < temp.length; index++) {
                const element = temp[index];

                if (element.id > max)
                    max = element.id
            }

            let newTodo = { id: max + 1, text: taskValue, done: false, show: true };
            temp.push(newTodo);
            localStorage.setItem('tasks', JSON.stringify(temp));

            setTodos(temp);
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

            <input type="text" title="new todo" className="new-todo-input" placeholder="Enter a new todo" value={taskValue} onKeyPress={(e) => addNewTodo(e)} onChange={(e) => handleInputChange(e)} />
        </div>

    );
}

export default NewTodo;