import React from 'react';
import styled from 'styled-components';


// Definimos los estilos del contenedor de cada tarea.
const IndividualTaskContainer = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr 50px 50px;
    justify-items: start;
    align-items: center;
    padding: 0 1rem;
    background: ${({ color }) => color};
    width: 100%;
    max-width: 250px;
    margin: 1rem auto;
    border-radius: 5px;
    height: auto;
    word-wrap: break-word;
`

// Definimos los estilos de cada boton que eliminara cada tarea realizada.
const TaskButton = styled.button`
    font-size:.8rem;
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    padding:.3rem .5rem;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    
    &:hover {
        background-color: #fff;
        color: #222;
    }
`

// Definimos los estilos del titulo de cada tarea que vayamos agregando a nuestra lista.
const TaskText = styled.p`
    color: #fff;
    text-decoration: ${({ done }) => done ? 'line-through' : 'none'};
`

const Task = ( { title, color, done, handleCompleteTask, handleDeleteTask, handleEditTask } ) => (
    
    <IndividualTaskContainer color = { color }>
        <input 
            type = "checkbox" 
            onChange = { handleCompleteTask } 
            defaultChecked = { done }
        />
        <TaskText  done={ done }>{ title }</TaskText>
        <TaskButton onClick={ handleEditTask } >Edit Task</TaskButton>
        <TaskButton onClick={ handleDeleteTask } >Delete Task</TaskButton>
    </IndividualTaskContainer>
)

export default Task;