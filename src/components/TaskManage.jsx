import React from 'react';
import styledComponents from 'styled-components';


// Definimos los estilos del contenedor de cada tarea.
const IndividualTaskContainer = styledComponents.div`
    display: grid;
    grid-template-columns: 30px 1fr 50px;
    justify-items: start;
    align-items: center;
    padding: 0 1rem;
    background-color: ${({ color }) => color};
    width: 100%;
    max-width: 250px;
    margin: 1rem auto;
    border-radius: 5px;
`

// Definimos los estilos de cada boton que eliminara cada tarea realizada.
const TaskButton = styledComponents.button`
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
const TaskText = styledComponents.p`
    color: #fff;
    text-decoration: ${({ done }) => done ? 'line-through' : 'none'};
`

const Task = ( { title, color, done, handleCompleteTask, handleDeleteTask } ) => (
    
    <IndividualTaskContainer color = { color }>
        <input 
            type = "checkbox" 
            onChange = { handleCompleteTask } 
            defaultChecked = { done }
        />
        <TaskText  done={ done }>{ title }</TaskText>
        <TaskButton onClick={ handleDeleteTask } >Delete Task</TaskButton>
    </IndividualTaskContainer>
)

export default Task;