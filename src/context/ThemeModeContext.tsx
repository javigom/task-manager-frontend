import React from 'react'

type ThemeModeContextValue = {
  mode: 'light' | 'dark'
  toggleMode: () => void
}

export const ThemeModeContext = React.createContext<ThemeModeContextValue>({
  mode: 'light',
  toggleMode: () => {}
})

export default ThemeModeContext
