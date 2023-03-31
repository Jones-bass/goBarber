import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} 

body {
  background: ${(props) => props.theme.black};
  -webkit-font-smoothing: antialiased; /* Deixa a fonte mais definida */
}

a {
  text-decoration: none;
}

body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${(props) => props.theme.black};
}

@media (max-width: 768px) {
  html {
    font-size: 87.5%;
  }
}
`
