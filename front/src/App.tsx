import { ThemeProvider } from 'styled-components'
import { Home } from './page/home'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

          <Home />
    </ThemeProvider>
  )
}

export default App
