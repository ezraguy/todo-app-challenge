import React, { createContext, useState } from 'react';

export const ToDoCopyContext = createContext();
export const ToDoCopyProvider = props => {
    const [todosCopy, setTodosCopy] = useState([
        { id: 1, text: 'complete online Javascript course', done: true },
        { id: 2, text: 'Jog around the park for 10 minutes', done: false },
        { id: 3, text: 'Read for 1 hour', done: false },
        { id: 4, text: 'pick up groceries', done: false },
        { id: 5, text: 'Complete Todo App on Frontend Mentor', done: false },
    ])
    return (
        <ToDoCopyContext.Provider value={[todosCopy, setTodosCopy]} >
            { props.children}
        </ToDoCopyContext.Provider >
    );
}