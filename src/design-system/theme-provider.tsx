import React from 'react'
import { ThemeProvider as BaseThemeProvider } from 'styled-components'
import baseTheme from './theme/base'

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
  return <BaseThemeProvider theme={baseTheme}>{children}</BaseThemeProvider>
}

export default ThemeProvider
