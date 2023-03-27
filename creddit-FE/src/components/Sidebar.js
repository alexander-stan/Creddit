import * as React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const SidebarContainer = styled.div`
  position: fixed; /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: auto; /* Set the width of the sidebar */
  z-index: 1; /* Stay on top of everything */
  left: 0;
  background-color: #293225;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-left: 115px;
`;

const SidebarItem = styled.div`
  height: 70px;
  text-align: left;
  margin-bottom: 0;
  a {
    display: flex;
    align-items: left;
    justify-content: left;
    font-size: 1.28em;
    color: white;
    height: 100%;
    padding: 0 20px;
    &:hover {
      opacity: 0.7;
      text-decoration: underline;
    }
    ${(props) =>
      props.active &&
      `
      color: #355e3b;
      text-decoration: underline;
    `}
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const items = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Accounts", path: "/accounts"},
    { name: "Transfers", path: "/transfers"},
    { name: "Add Accounts", path: "/add-accounts"},
    { name: "Settings", path: "/settings" },
    { name: "Log Out", path: "/"}

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
