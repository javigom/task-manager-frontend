import React from 'react'
import Container from '@mui/material/Container'

type Props = React.ComponentProps<typeof Container>

export default function AppContainer(props: Props) {
  return <Container maxWidth="lg" sx={{ py: 2 }} {...props} />
}
