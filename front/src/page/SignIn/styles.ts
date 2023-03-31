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

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      padding: 16px;
      width: 100%;

      border: 2px solid #232129;
      color: ${(props) => props.theme.gray200};

      display: flex;
      align-items: center;

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: ${(props) => props.theme.orange};
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;
      border: none;
      cursor: pointer;

      :hover {
        background-color: ${(props) => props.theme.orange100};
      }
    }

    a {
      color: ${(props) => props.theme.white100};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      :hover {
        color: ${(props) => props.theme.white300};
      }
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

    svg {
      margin-right: 16px;
    }

    :hover {
      color: ${(props) => props.theme.orange100};
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
`
