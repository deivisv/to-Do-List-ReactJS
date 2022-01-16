import React, { useState } from "react";
import { createGlobalStyle } from "styled-components"
import { generate as id } from 'shortid';

import allColors from "./styles/colors";
import FormTask from "./components/FormTask";
import Task from "./components/TaskManage";

const GlobalStyle = createGlobalStyle`
    body{
        font-family: sans-serif;
        background-color: #222;
        color: ${allColors.mainColor};
        text-align: center;
        margin: 0;
    }
`
const App = () => {

    const [colorSelected, setColorSelected] = useState(allColors.colors[0])
    const [tasks, setTasks] = useState([{
        title: 'First Task',
        color: allColors.colors[0],
        done: false
    }])

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (e.target.title.value.trim() !== '' ){
            createNewTask(e.target.title.value)
            e.target.title.value = ''
        }
    }
    
    const createNewTask = ( title ) =>{
        const newTask = {
            id: id(),
            title,
            color: colorSelected,
            done: false
        }

        const allTasks = [...tasks, newTask ]

        setTasks( allTasks )
    }

    const handleCompleteTask = ( id ) => {
        const currentTasks = [...tasks]
        const task = tasks.find( task => task.id === id )
        const index = currentTasks.indexOf(task)

        currentTasks[index].done = !currentTasks[index].done

        setTasks( currentTasks )
    }

    const handleDeleteTask = ( id ) => {
        let currentTasks = tasks
        currentTasks = currentTasks.filter(task => task.id !== id)

        setTasks( currentTasks )
    }

    const handleChangeColor = (color) =>{
        setColorSelected( color )
    }

    return ( 
        <>
            <GlobalStyle />
            <h1>To do List</h1>
            <FormTask 
                handleChangeColor = { handleChangeColor }
                handleSubmit = { handleSubmit }
                colorSelected = { colorSelected }
            />
            
            { tasks.length === 0 && <h2>Not tasks yet</h2> }
            
            {
                tasks.map( task => (
                    <Task
                        key = { id() }
                        done = { task.done }
                        title = { task.title }
                        color = { task.color }
                        handleCompleteTask = {() => handleCompleteTask(task.id) }
                        handleDeleteTask = {() => handleDeleteTask(task.id)}
                    />
                ))
            }

        </>
    )
}

export default App;