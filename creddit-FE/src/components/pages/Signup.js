import * as React from 'react';
import styled from 'styled-components';
import img from '../images/koibg.jpg'
import { useNavigate } from 'react-router-dom';

const Styles = styled.div`
background-image: url(${img});
background-size: cover;
width: 100vw;
height: 83.25vh;

.main{
    display: flex;
    background-repeat: no-repeat;
    flex-direction: column;
    background-size: 100% 100%;
}
.Sign-up-form{
    min-width: 25rem;
    max-width: 25rem;
    align-self: center;
    width: 30%;
    margin: 1rem 0;
    background-color: #E0E0E0;
    text-align: center;
    border-radius: 8px;
    .formHeader{
        font-size: 36px;
        padding: 20px;
    }
}

.create{
    transition-duration: 0.4s;
    cursor: pointer;
    width: 240px;
    margin-top: 25px;
    font-size:22px;
    color: white;
    background-color: #80ac2f;
    padding-top:15px;
    padding-bottom: 15px;
    border-radius: 8px;
    border: none;
}
button:hover{
    background-color:#95cf2a;
}
input[type="button"]:hover{
    background-color:#95cf2a;
}
input[type="submit"]:hover{
    background-color:#95cf2a;
}
form {
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
}
form label{
    color: #252B23;
    font-size: 18px;
    margin-left: 10px;
    float: left;
    padding-top: 10px;
}

form input[type="text"] , [type="password"]{
    width: 96%;
    padding-top:15px;
    padding-left: 15px;
    padding-bottom: 15px;
    border-radius: 8px;
    border: none;
    box-shadow: inset 0 2.5px 6px rgba(0,0,0,.39), 0 0px 3px #FFF,0 2px 0 #FFF;
}
.agreement{
    padding-top: 25px;
    padding-bottom: 25px;
    font-style: italic;
    font-size: 15px;
    color: #717171;
    text-align: center;
    line-height: 1.5em;
}

.captcha{
    font-style: italic;
    font-weight: bold;
    padding: 25px 0px;
    width: 100%;
    background-color: #a5a4a4;
    text-align: center;
    border-radius: 9px;
}
.termsColor{
    color:#4A8FF6;
}
`;

export const Signup = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/redirect`;
        navigate(path);
    }
    return (
        <Styles>
            <div className='main'>
                <div className='Sign-up-form'>
                    <p className="formHeader">Create Account</p>
                    <form>
                        <label>Name</label>
                        <input type="password"/>
                        <label>Password</label>
                        <input type="text"/>
                        <label>Email</label>
                        <input type="text"/>
                        <label>Phone</label>
                        <input type="text"/>
                        <label>Address</label>
                        <input type="text"/>
                        <button type="button" className="create" onClick={routeChange}>Create Account</button>
                    </form>
                    {/* <p className="agreement">By logging in to your account, you agree to our <span className="termsColor">Terms</span> and<br />
                        have read and acknowledge our <span className="termsColor">Global Privacy<br />Statement.</span></p>
                    <div className="captcha">
                        <p>Invisble reCAPTCHA by <span className="termsColor">Google Privacy Policy</span> and <span className="termsColor">Terms of Use</span></p>
                    </div> */}
                </div>
            </div>
        </Styles>
    )
}