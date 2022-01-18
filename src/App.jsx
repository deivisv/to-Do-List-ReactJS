import React, { useState } from "react";
import swal from 'sweetalert';
import styled, { createGlobalStyle } from "styled-components"
import { generate as id } from 'shortid';

import allColors from "./styles/colors";
import FormTask from "./components/FormTask";
import Task from "./components/TaskManage";
import NavBarApp from "./components/NavBarApp";
import "./styles/App.css"

const GlobalStyle = createGlobalStyle`
    body{
        font-family: sans-serif;
        background: #151A30;
        color: ${allColors.mainColor};
        text-align: center;
        margin: 0;
    }
`

const ButtonGetRamdonFact = styled.button`
    margin-top: 20px;
    background-color: transparent;
    border: 1px solid ${allColors.mainColor};
    border-radius: 5px;
    color: ${allColors.mainColor};
    padding: .3rem .5rem;
    cursor: pointer;
    outline: none;
`

const App = () => {

    const [colorSelected, setColorSelected] = useState(allColors.colors[0])
    const [tasks, setTasks] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.title.value.trim() !== '') {
            createNewTask(e.target.title.value)
            e.target.title.value = ''
        }
    }

    const createNewTask = (title) => {
        const newTask = {
            id: id(),
            title,
            color: colorSelected,
            done: false
        }

        const allTasks = [...tasks, newTask]
        /* console.log(allTasks) */
        setTasks(allTasks)
    }

    const handleCompleteTask = (id) => {
        const currentTasks = [...tasks]
        const task = tasks.find(task => task.id === id)
        const index = currentTasks.indexOf(task)

        currentTasks[index].done = !currentTasks[index].done

        setTasks(currentTasks)
    }

    const handleEditTask = (id) => {
        let currentTasks = [...tasks]
        const task = tasks.find(task => task.id === id)

        swal("Type your change in this task:", {
            content: {
                element: "input",
                attributes: {
                    value: `${task.title}`,
                    type: "text",
                },
            },
        })
            .then((value) => {
                console.log(value)
                currentTasks.map((dato) => {
                    if (dato.id === id && value !== null) {
                        dato.title = value
                        console.log("Cambio")
                        return dato;
                    }else{
                        console.log("No cambio")
                    }
                });
                swal(`You typed: ${value}`);
            });
    }

    const handleDeleteTask = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once this task is deleted, you will not be able to get it back!",
            icon: "warning",
            buttons: {
                cancel: {
                    text: "Don't delete task",
                    value: null,
                    visible: true,
                    className: 'redColor',
                    closeModal: true,

                },
                confirm: {
                    text: "Yes, please remove it.",
                    value: true,
                    visible: true,
                    className: "greenColor",
                    closeModal: true
                }
            },
        })
            .then((willDelete) => {
                if (willDelete) {
                    let currentTasks = tasks
                    currentTasks = currentTasks.filter(task => task.id !== id)

                    setTasks(currentTasks)
                    swal("Ok, your task has been deleted.", {
                        icon: "success",
                    });
                } else {
                    swal("Your tasks list is safe!", {
                        icon: "success",
                        buttons: false,
                        timer: 2000,
                    });
                }
            });
    }

    const handleChangeColor = (color) => {
        setColorSelected(color)
    }

    const FetchApi = () => {
        swal({
            text: 'Search for a movie. e.g. "La La Land".',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Type your number",
                    type: "number",
                    pattern: "/^([0-9])*$/",
                },
            },
            button: {
                text: "Search!",
                closeModal: false,
            },
        })
            .then(numberFacts => {
                // eslint-disable-next-line no-throw-literal
                if (!numberFacts) throw null;

                return fetch(`https://catfact.ninja/facts?limit=${numberFacts}`);
            })
            .then(results => {
                return results.json();
            })
            .then(json => {
                const dataAPi = json.data;
                /* console.log(dataAPi[0].fact) */

                if (!dataAPi) {
                    return swal("That not a number sorry!");
                }

                /* dataAPi.map((title) => (
                    createNewTask(title.fact)
                )) */

                for (const iterator of dataAPi) {
                    /* debugger */
                    // console.log(iterator.fact)
                    console.log(iterator.fact)
                    // let name = iterator.fact;
                    // console.log(name)
                    createNewTask(iterator.fact)
                }
            })
            .catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    }

    return (
        <>
            <GlobalStyle />
            <NavBarApp />
            <ButtonGetRamdonFact onClick={FetchApi} >Get ramdom fact</ButtonGetRamdonFact>
            <h1>Add your task!</h1>
            <FormTask
                handleChangeColor={handleChangeColor}
                handleSubmit={handleSubmit}
                colorSelected={colorSelected}
            />

            {tasks.length === 0 && <h2>Not tasks yet</h2>}

            {
                tasks.map(task => (
                    <Task
                        key={id()}
                        done={task.done}
                        title={task.title}
                        color={task.color}
                        handleCompleteTask={() => handleCompleteTask(task.id)}
                        handleDeleteTask={() => handleDeleteTask(task.id)}
                        handleEditTask={() => handleEditTask(task.id)}
                    />
                ))
            }

        </>
    )
}

export default App;