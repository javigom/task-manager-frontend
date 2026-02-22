import React from 'react'
import TextField from '@mui/material/TextField'

type Props = React.ComponentProps<typeof TextField>

export default function TextInput(props: Props) {
  return <TextField fullWidth margin="normal" variant="outlined" size="small" {...props} />
}
