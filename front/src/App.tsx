import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'
import { AuthProvider } from './hooks/auth'
import { SignIn } from './page/SignIn'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </ThemeProvider>
  )
}
