import styled from 'styled-components'

export const Container = styled.button`
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
`
