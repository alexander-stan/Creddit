import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #293225; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: white;
    &:hover { opacity: 0.7}
  }
  .navbar-brand {
    font-size: 1.4em;
    color: white;
    &:hover { opacity: 0.7 }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Creddit</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <Nav.Item><Nav.Link href="/dashboard">Dashboard</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/settings">Settings</Nav.Link></Nav.Item> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)