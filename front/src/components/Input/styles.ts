import styled from 'styled-components'

export const Container = styled.div`
  background: ${(props) => props.theme.black100};
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid ${(props) => props.theme.black100};
  color: ${(props) => props.theme.gray200};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: ${(props) => props.theme.white100};
    padding: 5px;

    &::placeholder {
      color: ${(props) => props.theme.gray200};
    }

    &:focus {
      border: 100px;
    }
  }

  svg {
    margin-right: 16px;
  }
`
