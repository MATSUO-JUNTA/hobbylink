import ErrorIcon from '@mui/icons-material/Error'
import { Typography, Box } from '@mui/material'

type ValidationMessageProps = {
  message: string
}

const ValidationMessage = ({ message }: ValidationMessageProps) => {
  return (
    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
      <ErrorIcon color="error" sx={{ fontSize: 19, mr: 0.2 }} />
      <Typography color="error" sx={{ fontSize: 13 }}>
        {message}
      </Typography>
    </Box>
  )
}

export default ValidationMessage
