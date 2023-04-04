import styled from 'styled-components'

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: #f4ede8;
    padding: 5px;

    &::placeholder {
      color: #666360;
    }

    &:focus {
      border: 100px;
    }
  }

  svg {
    margin-right: 16px;
  }
`
