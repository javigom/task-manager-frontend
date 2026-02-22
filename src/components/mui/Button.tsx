import React from 'react'
import MuiButton from '@mui/material/Button'

type Props = React.ComponentProps<typeof MuiButton>

export default function Button(props: Props) {
  return <MuiButton variant={props.variant || 'contained'} color={props.color || 'primary'} {...props} />
}
