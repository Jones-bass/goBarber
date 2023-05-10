import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  padding: 32px 0;
  background: ${(props) => props.theme.black100};
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    border: 0;
    background: transparent;

    svg {
      color: ${(props) => props.theme.gray200};
      height: 20px;
      width: 20px;
      cursor: pointer;

      &:hover {
        color: ${(props) => props.theme.orange};
        opacity: 0.8;
      }
    }
  }
`

export const Profile = styled.div`
  margin-left: 80px;

  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    margin-left: 16px;
    line-height: 24px;

    display: flex;
    flex-direction: column;

    span {
      color: ${(props) => props.theme.white100};
    }

    a {
      color: ${(props) => props.theme.orange};

      &:hover {
        opacity: 0.8;
      }
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;

  display: flex;
`

export const Schedule = styled.div`
  margin-right: 120px;

  flex: 1;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 32px;
    color: ${(props) => props.theme.orange};
    font-weight: 500;

    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: ${(props) => props.theme.orange};
      margin: 0 8px;
    }
  }
`

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: ${(props) => props.theme.gray100};
    font-size: 20px;
    line-height: 26px;
    display: block;
    border-bottom: 1px solid ${(props) => props.theme.gray200};
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: ${(props) => props.theme.gray100};
    font-weight: 400;
  }
`
