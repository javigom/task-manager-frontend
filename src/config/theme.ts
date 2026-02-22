import { createTheme } from '@mui/material/styles'

export default function getTheme(mode: 'light' | 'dark' = 'light') {
    const isDark = mode === 'dark'
    return createTheme({
        palette: {
            mode,
            primary: { main: '#5B8DEF' },
            secondary: { main: '#7CFFCB' },
            background: {
                default: isDark ? '#0b1220' : '#F5F7FB',
                paper: isDark ? '#07101a' : '#FFFFFF'
            }
        },
        shape: { borderRadius: 12 },
        typography: {
            fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
            button: { textTransform: 'none', fontWeight: 600 }
        }
    })
}
