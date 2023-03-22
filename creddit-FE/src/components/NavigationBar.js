import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  img {
    max-width: 150px;
    max-height: 150px;
  }

  .text {
    color: white;
    font-size: 20px;
    text-align: left;
    padding-top: 32px;
  }
  .navbar {
    background-color: #293225;
    padding-left: 100px;
    padding-right: 125px;
  }
  a:hover {
    /* add underline/opacity to :hover state */
    text-decoration: underline;
    opacity: 0.7;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: white;
    font-size: 1.15em;
  }
  .navbar-brand {
    font-size: 1.4em;
    color: white;
  }
  .ml-auto {
    margin-left: auto !important;
    display: flex;
    align-items: center;
  }
  .ml-auto > * {
    margin-right: 18px;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <div>
          <img src="logo.jpg" alt="Creddit logo"></img>
        </div>
      </Navbar.Brand>

      <Navbar.Brand href="/">Creddit</Navbar.Brand>

      <Nav className="ml-auto">
        <Nav.Item>
          <Nav.Link href="/log-in">Log in</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/get-started">Get Started</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Styles>
);
