import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#5B8DEF',
        },
        secondary: {
            main: '#7CFFCB',
        },
        background: {
            default: '#F5F7FB',
            paper: '#FFFFFF'
        }
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        button: { textTransform: 'none', fontWeight: 600 }
    }
})

export default theme
