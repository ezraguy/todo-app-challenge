import React, { useContext, useState, useEffect } from 'react';
import '../scss/list.scss';
import check from '../icons/icon-check.svg';
import NewTodo from './new-todo';
import { ToDoContext } from '../context/todos-context';
import { ToDoCopyContext } from '../context/todos-copy-context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const List = () => {
    const [todos, setTodos] = useContext(ToDoContext);
    const [todosCopy, setTodosCopy] = useContext(ToDoCopyContext);
    const [filtering, setFiltering] = useState([
        { id: 1, value: 'all', active: true },
        { id: 2, value: 'active', active: false },
        { id: 3, value: 'completed', active: false }]);

    const handleFinishTodo = (todo) => {
        let id = todo.id;
        const tasks = [...todos];
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (id === element.id)
                element.done = true;
        }

        setTodos(tasks);
    }

    useEffect(() => {
        let temp = [...todos];
        setTodosCopy(temp);
    }, []);


    const handleFilter = (option) => {
        let temp = [];
        switch (option.value) {
            case 'all':
                setTodos([...todosCopy])
                break
            case 'active':
                temp = todosCopy.filter((item: { done: boolean; }) => item.done === false);
                setTodos(temp)
                break
            case 'completed':
                temp = todosCopy.filter((item: { done: boolean; }) => item.done === true);
                setTodos(temp)
        }

        changeFilterClass(option);
    }

    const changeFilterClass = (option: option) => {
        let filteringCopy = [...filtering];
        for (let index = 0; index < filteringCopy.length; index++) {
            const element = filteringCopy[index];
            if (element.value === option.value) {
                element.active = true
            }
            else
                element.active = false
        }
        setFiltering(filteringCopy);
    }

    const clearCompleted = () => {
        let temp = [...todos];
        let itemsToRemove = []
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            if (element.done === true) {
                itemsToRemove.push(index)
            }

        }

        for (let index = itemsToRemove.length - 1; index >= 0; index--) {
            temp.splice(itemsToRemove[index], 1);
        }


        setTodos(temp);
        setTodosCopy(temp);

    }
    return (
        <div className="list">
            <NewTodo />
            <DragDropContext onDragEnd={() => console.log('s')}>;
          
            <Droppable droppableId="tasks">
                    {(provided) => {

                        <div className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => {
                                return (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index} >
                                        <div className="todo">
                                            <div className="circle-wrap">
                                                <div className={todo.done === true ? "circle circle-done" : 'circle'} onClick={() => handleFinishTodo(todo)}>
                                                    {
                                                        todo.done === true &&
                                                        <img src={check} className="check" alt="check" />
                                                    }
                                                </div>
                                            </div>
                                            <input type="text" disabled={true} className={todo.done === true ? "todo-input done" : 'todo-input '} placeholder={todo.text} />

                                        </div>
                                    </Draggable>
                                )
                            })}
                            <div className="filter">
                                <div className="items-left">
                                    <p>{todos.length} items left</p>
                                </div>
                                <div className="filtering-options">
                                    {filtering.map((option) => {
                                        return <p key={option.id} onClick={() => handleFilter(option)} className={option.active ? 'active' : ''}>{option.value}</p>
                                    })}
                                </div>
                                <div className="clear">
                                    <p onClick={clearCompleted}>clear Completed</p>
                                </div>
                            </div>
                        </div >
                    }}
                </Droppable>
            </DragDropContext>

        </div >
    );
}

export default List;