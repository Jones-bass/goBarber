import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import { SignIn } from './page/SignIn'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <SignIn />
    </ThemeProvider>
  )
}

export default App
