import React, { useContext, useState, useEffect } from 'react';
import '../scss/list.scss';
import check from '../icons/icon-check.svg';
import NewTodo from './new-todo';
import { ToDoContext } from '../context/todos-context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import xBtn from '../icons/icon-cross.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = () => {
    const [todos, setTodos] = useContext(ToDoContext);
    const [filtering, setFiltering] = useState([
        { id: 1, value: 'all', active: true },
        { id: 2, value: 'active', active: false },
        { id: 3, value: 'completed', active: false }]);


    const handleFinishTodo = (todo) => {
        let id = todo.id;
        const tasks = [...todos];
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (id === element.id && element.done === false)
                element.done = true;
            else
                if (id === element.id && element.done === true) {
                    element.done = false
                }
        }

        setTodos(tasks);

    }




    const handleFilter = (option) => {
        let temp = [...todos];
        switch (option.value) {
            case 'all':
                for (let index = 0; index < temp.length; index++) {
                    const element = temp[index];
                    element.show = true
                }
                break
            case 'active':
                for (let index = 0; index < temp.length; index++) {
                    const element = temp[index];
                    if (element.done === false)
                        element.show = true
                    else
                        element.show = false
                }

                break
            case 'completed':
                for (let index = 0; index < temp.length; index++) {
                    const element = temp[index];
                    if (element.done === true)
                        element.show = true
                    else
                        element.show = false
                }

                break
            default:
                return


        }
        setTodos(temp);
        changeFilterClass(option);
    }

    const changeFilterClass = (option) => {
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

    const clearCompleted = (item, type) => {
        let temp = [...todos];
        if (type === 'All') {
            let i = 0;
            while (i < temp.length) {
                if (temp[i].done === true) {
                    temp.splice(i, 1);
                }
                else
                    i++;
            }
            toast("Completed tasks were cleared!");
        }

        if (type === 'single') {
            temp.splice(item, 1);
        }
        setTodos(temp);



    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        let temp = [...todos];
        const [reorderItem] = temp.splice(result.source.index, 1);
        temp.splice(result.destination.index, 0, reorderItem);
        setTodos(temp);

    }
    const calcLeftItems = () => {
        let itemsLeft = todos.filter(item => item.done === false);
        return itemsLeft.length


    }
    return (
        <React.Fragment>
            <ToastContainer />
            <NewTodo />
            <div className="list">
                <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div className="todos"  {...provided.droppableProps} ref={provided.innerRef}  >
                                {todos.length === 0 && <p className="no-tasks-left">Great Job!</p>}
                                {todos.map((todo, index) => {
                                    if (todo.show === true) {


                                        return (<Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                            {(provided) => (
                                                <div className="todo" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="circle-wrap">
                                                        <div className={todo.done === true ? "circle circle-done" : 'circle'} onClick={() => handleFinishTodo(todo)}>
                                                            {
                                                                todo.done === true &&
                                                                <img src={check} className="check" alt="check" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <p className={todo.done === true ? "task-value done" : 'task-value '} >{todo.text}</p>

                                                    <img src={xBtn} className="x-btn" onClick={() => clearCompleted(index, 'single')} alt="x icon" />
                                                </div>

                                            )}

                                        </Draggable>)
                                    }

                                }










                                )}
                                {provided.placeholder}
                            </div>

                        )}
                    </Droppable>
                </DragDropContext>

                <div className="filter">
                    <div className="items-left">
                        <p>{calcLeftItems()} items left</p>
                    </div>
                    <div className="filtering-options">
                        {filtering.map((option) => {
                            return <p key={option.id} onClick={() => handleFilter(option)} className={option.active ? 'active' : ''}>{option.value}</p>
                        })}
                    </div>
                    <div className="clear">
                        <p onClick={() => clearCompleted(0, 'All')}>clear Completed</p>
                    </div>
                </div>

            </div>
            <div className="filtering-options-mobile">
                {filtering.map((option) => {
                    return <p key={option.id} onClick={() => handleFilter(option)} className={option.active ? 'active' : ''}>{option.value}</p>
                })}
            </div>
            <p className="dragDropMessage">Drag and drop to reorder list</p>
            <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" >Frontend Mentor</a>.
    Coded by <a href="https://github.com/ezraguy">Guy Ezra</a>.
  </div>
        </React.Fragment>

    );
}

export default List;