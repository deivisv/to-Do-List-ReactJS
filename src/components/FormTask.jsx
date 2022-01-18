import React from 'react';
import styled from 'styled-components';
import allColors from '../styles/colors';
import ColorBox from './ColorBox';
import { generate as id } from 'shortid';

// Definimos los estilos del input en donde escribimos el titulo de cada tarea.
const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${allColors.mainColor};
    background: none;
    outline: none;
    color: ${allColors.mainColor};
`
// Definimos los estilos del boton que agrega cada tarea a la lista.
const Button = styled.button`
    background: linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%);
    border: 1px solid ${allColors.mainColor};
    border-radius: 5px;
    color: #fff;
    padding: .3rem .5rem;
    cursor: pointer;
    outline: none;

    &:hover{
        background-color: ${allColors.mainColor};
        color: #fff;
    }
`

// Definimos los estilos del contenedor que contiene todo el formulario.
const StylesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    margin: 0 auto .5rem;
`

const FormTask = ({ handleChangeColor, handleSubmit, colorSelected }) =>(
    <form onSubmit = { handleSubmit }>
        <Input name="title" type="text" />
        <StylesContainer>
            {
                allColors.colors.map(color => (
                    <ColorBox 
                        handleChangeColor = { handleChangeColor } 
                        color = { color }
                        key = { id() }
                        isChecked = { colorSelected === color }
                    />
                ))
            }
        </StylesContainer>
        <Button>Add Task</Button>
    </form>
)

export default FormTask;