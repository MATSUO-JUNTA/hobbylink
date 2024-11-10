import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import { Box, Typography, IconButton, AppBar, Toolbar } from '@mui/material'
import { useRouter } from 'next/navigation'

type NavigationHeaderProps = {
  title: string
}
const NavigationHeader = ({ title }: NavigationHeaderProps) => {
  const router = useRouter()

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ position: 'absolute', left: 15 }}>
          <IconButton size="small" onClick={router.back}>
            <ArrowBackSharpIcon sx={{ color: '#666666' }} />
          </IconButton>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'bold', color: 'black' }}
          >
            {title}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationHeader
