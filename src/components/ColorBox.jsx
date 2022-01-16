import React from 'react';
import styledComponents from 'styled-components';

const LabelStyles = styledComponents.label`
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-top: .5rem; 
    background-color: ${({ color }) => color};
    border-radius: 5px;
`

const InputRadio = styledComponents.input`
    display: none;
    
    &:checked + label{
        border:1px solid #fff;
    }
`

const ColorBox = ( { color, handleChangeColor, isChecked } ) => (
    <>
        <InputRadio
            defaultChecked = { isChecked }
            id = { color }
            type = "radio" 
            name = "color" 
            onChange = { () => handleChangeColor(color) }
        />
        <LabelStyles htmlFor={color} color={color}></LabelStyles>
    </>
)

export default ColorBox;