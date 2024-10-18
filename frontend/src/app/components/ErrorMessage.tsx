import { Box, Typography } from '@mui/material'

type ErrorMessageProps = {
  errorCode: string
  errorMessage: React.ReactNode
}

const ErrorMessage = ({ errorCode, errorMessage }: ErrorMessageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        height: 'calc(100vh - 64px)',
        maxWidth: '70%',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" sx={{ color: '#1E90FF', mb: 1 }}>
        {errorCode}
      </Typography>
      <Typography variant="body2">{errorMessage}</Typography>
    </Box>
  )
}

export default ErrorMessage
