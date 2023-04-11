import styled from 'styled-components'
import Tooltip from '../Tooltip'

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
      outline: none;
    }
  }

  svg {
    margin-right: 16px;
  }
`
export const ErrosText = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
