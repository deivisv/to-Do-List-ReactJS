import React from 'react';
import styled from 'styled-components';
import { TiThListOutline } from "react-icons/ti";

const NavBarContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    color: #fff;
`

const NavBarLogo = styled.a`
    width: 10%;
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 1%;
    font-size: 2.5rem;
`

const NavBarTitle = styled.p`
    margin-block-start: unset;
    font-size: 2.5rem;

        @media (max-width: 400px) {
            font-size: 1rem;
        }
`

const NavBarApp = () => (
    <NavBarContainer>
        <NavBarLogo>
            <TiThListOutline />
        </NavBarLogo>
        <NavBarTitle>To Do List - App</NavBarTitle>
    </NavBarContainer>
)

export default NavBarApp;