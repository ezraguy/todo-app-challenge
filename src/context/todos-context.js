import React, { createContext, useState } from 'react';

export const ToDoContext = createContext();
export const ToDoProvider = props => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'complete online Javascript course', done: true },
        { id: 2, text: 'Jog around the park for 10 minutes', done: false },
        { id: 3, text: 'Read for 1 hour', done: false },
        { id: 4, text: 'pick up groceries', done: false },
        { id: 5, text: 'Complete Todo App on Frontend Mentor', done: false },


    ])
    return (
        <ToDoContext.Provider value={[todos, setTodos]} >
            { props.children}
        </ToDoContext.Provider >
    );
}