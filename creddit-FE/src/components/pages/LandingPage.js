import React from "react"
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"

const Wrapper = styled.div`
.landing-container{
    background-color: #293225;
    height: 100vh;
    text-align: center;
}

.banner-container {
    padding-top: 4.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    width: 400px;
    padding-top: 50px;
  }

.text-section {
    padding-top: 3.5rem;
    max-width: 600px;
}

.heading {
    font-size: 2.5rem;
    color: white;
    max-width: 600px;
    margin: 0rem 0rem;
}

.primary-text {
    font-size: 1rem;
    max-width: 600px;
    color: #9EB23B;
    margin: 1.5rem;
}

.landing-image{
    max-width: 400px;
}

.get-started-button {
    padding: 1rem 2.5rem;
    background-color: #609966;
    outline: none;
    border: none;
    border-radius: 4rem;
    font-size: 1.05rem;
    cursor: pointer;
    font-weight: 600;
    color: white;
    transition: 0.2s;
}

.get-started-button svg {
    margin-left: 0.75rem;
    font-size: 1.5rem;
}

.get-started-button:hover {
    background-color: #9DC08B;
}
`;

export const LandingPage = () => {
    const navigate = useNavigate();
    const routeChange = () => {
        navigate("/signup");
    }
    return (
        <Wrapper>
        <div className="landing-container">
            <div className="banner-container">
                <div className="text-section">
                    <h1 className="heading">
                        Bank safe, don't sweat it!
                    </h1>
                    <p className="primary-text">
                        Welcome to Creddit! Create an account and gain access to services that will make your online banking experience, safe, easy, and secure.
                    </p>
                    <button className="get-started-button" onClick={routeChange}>
                        Get Started
                    </button>
                </div>
                <div className="Landing-image">
                    <img src="secure.png" alt="" />
                </div>
            </div>
        </div>
      </Wrapper>
    )
}
    