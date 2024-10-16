'use client'

import { Typography, Box } from '@mui/material'

const Error = () => {
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
        500
      </Typography>
      <Typography variant="body2">
        何らかの理由でサーバーが応答していません。
        <br />
        時間をおいて再度アクセスするか、 サイトの管理者にお問い合わせください。
      </Typography>
    </Box>
  )
}

export default Error
