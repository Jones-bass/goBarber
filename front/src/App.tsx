import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import SignUp from './page/SignUp'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <SignUp />
    </ThemeProvider>
  )
}

export default App
