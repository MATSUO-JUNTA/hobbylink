'use client'

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import LoginModal from './LoginModal'

const fontStyle = { fontSize: 12, fontWeight: 'bold', ml: 0.5 }
const menuItemStyle = { px: 1.3 }

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const { data: session } = useSession()

  const hiddenPathnames = ['/posts/search']
  const pathname = usePathname()

  if (hiddenPathnames.includes(pathname)) return <></>

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
          {session && session.user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="メニューを開く">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="user"
                    src={session.user.image as string}
                    sx={{ width: 33, height: 33 }}
                  />
                </IconButton>
              </Tooltip>
              <Paper>
                <Menu
                  sx={{ mt: '40px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link href="/terms">
                    <MenuItem onClick={handleCloseUserMenu} sx={menuItemStyle}>
                      <DescriptionOutlinedIcon />
                      <Typography sx={fontStyle}>利用規約</Typography>
                    </MenuItem>
                  </Link>
                  <Link href="/privacy">
                    <MenuItem sx={menuItemStyle}>
                      <VerifiedUserOutlinedIcon />
                      <Typography sx={fontStyle}>
                        プライバシーポリシー
                      </Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem sx={menuItemStyle} onClick={() => signOut()}>
                    <LogoutIcon />
                    <Typography sx={fontStyle}>ログアウト</Typography>
                  </MenuItem>
                </Menu>
              </Paper>
            </Box>
          ) : (
            <Button
              variant="contained"
              startIcon={
                <LoginIcon sx={{ marginRight: 0, fontSize: 'small' }} />
              }
              sx={{
                width: 75,
                height: 'auto',
                padding: 0.5,
                fontSize: 9,
                fontWeight: 'bold',
              }}
              onClick={handleOpen}
            >
              ログイン
            </Button>
          )}
          <LoginModal open={open} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
