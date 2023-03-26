import React from "react"
import styled from 'styled-components'

const Wrapper = styled.div`
.landing-container{
    background-color: #293225;
    height: 80vh;
    text-align: center;
}

.banner-container {
    padding-top: 50px;
    position: relative;
    display: flex;
}

img {
    width: 400px;
  }

.text-section {
    padding-top: 85px;
    padding-left: 300px;
    max-width: 800px;
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
    max-width: 50px;
    max-height: 50px;
    padding-right: 355px;
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

export const LandingPage = () => (
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
                    <button className="get-started-button">
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