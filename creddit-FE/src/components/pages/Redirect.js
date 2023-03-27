import * as React from 'react';
import styled from 'styled-components';
import { useNavigate  } from 'react-router-dom';

const Wrapper = styled.div`
.main{
    height: 83.25vh;
    width: 100vw;
    background-color: #293225;
    background-position: center;
    background-size: 110%;
    position: absolute;
}

.loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .jimu-primary-loading:before,
  .jimu-primary-loading:after {
    position: absolute;
    top: 0;
    content: '';
  }
  
  .jimu-primary-loading:before {
    left: -19.992px;
  }
  
  .jimu-primary-loading:after {
    left: 19.992px;
    -webkit-animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
  }
  
  .jimu-primary-loading:before,
  .jimu-primary-loading:after,
  .jimu-primary-loading {
    background: #74992E;
    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 13.6px;
    height: 32px;
  }
  
  .jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: absolute;
    right: calc(50% - 6.8px);
    top: calc(50% - 16px);
    -webkit-animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
  }
  
  @-webkit-keyframes loading-keys-app-loading {
  
    0%,
    80%,
    100% {
      opacity: .75;
      box-shadow: 0 0 #74992E;
      height: 32px;
    }
  
    40% {
      opacity: 1;
      box-shadow: 0 -8px #74992E;
      height: 40px;
    }
  }
  
  @keyframes loading-keys-app-loading {
  
    0%,
    80%,
    100% {
      opacity: .75;
      box-shadow: 0 0 #74992E;
      height: 32px;
    }
  
    40% {
      opacity: 1;
      box-shadow: 0 -8px #74992E;
      height: 40px;
    }
  }
`;

export const Redirect = () => {
    let navigate = useNavigate();
    
    const routeChange = () =>{ 
      let path = `/dashboard`; 
      navigate(path);
    }
  
    setTimeout(routeChange, 3000);
  
    return (
      <>
        <Wrapper>
          <div className="main">
            <div className="loader">
              <div className="justify-content-center jimu-primary-loading"></div>
            </div>
          </div>
        </Wrapper>
      </>
    );
  }
