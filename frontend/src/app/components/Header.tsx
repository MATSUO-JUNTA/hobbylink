import LoginIcon from '@mui/icons-material/Login'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={85} height={35} priority />
          </Link>
          <Button
            variant="contained"
            startIcon={<LoginIcon sx={{ marginRight: 0, fontSize: 'small' }} />}
            sx={{
              width: 75,
              height: 'auto',
              padding: 0.5,
              fontSize: 9,
              fontWeight: 'bold',
            }}
          >
            ログイン
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
