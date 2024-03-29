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
export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: ${(props) => props.theme.white300};
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: ${(props) => props.theme.gray};
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    display: flex;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: ${(props) => props.theme.orange};
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${(props) => props.theme.white};
    }

    span {
      margin-left: auto;
      color: ${(props) => props.theme.white300};

      display: flex;
      align-items: center;

      svg {
        color: ${(props) => props.theme.orange};
        margin-right: 8px;
      }
    }
  }
`

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    color: ${(props) => props.theme.white300};
    width: 72px;

    display: flex;
    align-items: center;

    svg {
      color: ${(props) => props.theme.orange};
      margin-right: 8px;
    }
  }

  div {
    background: ${(props) => props.theme.gray};
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    display: flex;
    align-items: center;
    flex: 1;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${(props) => props.theme.white};
      font-size: 20px;
    }
  }
`

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: ${(props) => props.theme.white300};
    font-size: 20px;
    line-height: 26px;
    display: block;
    border-bottom: 1px solid ${(props) => props.theme.gray200};
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: ${(props) => props.theme.gray};
    font-weight: 400;
  }
`

export const Calender = styled.aside`
  width: 380px;

  .DayPicker {
    background: ${(props) => props.theme.black100};
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${(props) => props.theme.gray};
    border-radius: 10px;
    color: ${(props) => props.theme.white};
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(
      .DayPicker-Day--selected
    ):not(.DayPicker-Day--outside):hover {
    background: ${(props) => props.theme.orange100};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: ${(props) => props.theme.gray100} !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: ${(props) => props.theme.orange} !important;
    border-radius: 10px;
    color: ${(props) => props.theme.gray100} !important;
  }
`
