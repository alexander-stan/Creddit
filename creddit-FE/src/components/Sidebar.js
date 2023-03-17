import * as React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";

const SidebarContainer = styled.div`
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 6em;     /* Set the width of the sidebar */
  z-index: 1;      /* Stay on top of everything */
  top: 3.4em;     
  background-color: #293225; 
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;`;

const SidebarItem = styled.div`
height: 70px;
width: 6em; /* width must be same size as NavBar to center */
text-align: center; 
margin-bottom: 0;   
a {
    font-size: 1em;
    color: ${(props) => props.active ? "#355e3b" : "white"};
    :hover {
        opacity: 0.7;
        text-decoration: none; /* Gets rid of underlining of icons */
    }  
}`

const Sidebar = () => {
    const location = useLocation();
    const items = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <SidebarContainer>
            {items.map((item) => (
                <SidebarItem key={item.path} active={item.path === location.pathname}>
                    <Link to={item.path}>{item.name}</Link>
                </SidebarItem>
            ))}
        </SidebarContainer>
    );
};

export default Sidebar;