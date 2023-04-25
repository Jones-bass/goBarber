import styled, { keyframes } from 'styled-components'

import backgroundImage from '../../assets/sign-in-background.png'

const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-50px);
}

to {
  opacity: 1;
  transform: translateX(0);
}
`

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    color: ${(props) => props.theme.white};

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: ${(props) => props.theme.orange};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${(props) => props.theme.orange100};
    }

    svg {
      margin-right: 16px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
`
