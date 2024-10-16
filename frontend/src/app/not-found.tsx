import { Box, Typography } from '@mui/material'

const NotFound = () => {
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
        404
      </Typography>
      <Typography variant="body2">
        お探しのページは存在しません。
        <br />
        一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。
      </Typography>
    </Box>
  )
}

export default NotFound
