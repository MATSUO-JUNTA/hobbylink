'use client'

import AddBoxIcon from '@mui/icons-material/AddBox'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useContext } from 'react'
import LoginModal from './LoginModal'
import { ProductContext } from '@/contexts/ProductContext'

const getInitValue = (pathname: string) => {
  if (pathname === '/') return 0
  if (pathname.startsWith('/search')) return 1
  if (pathname.startsWith('/posts')) return 2
  if (pathname.startsWith('/notifications')) return 3
  if (pathname.startsWith('/my-page')) return 4
  return 0
}

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(getInitValue(pathname))
  const { resetFormData } = useContext(ProductContext)
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { data: session } = useSession()

  useEffect(() => setValue(getInitValue(pathname)), [pathname])

  const checkUserLogin = (path: string) => {
    if (session?.user) {
      router.push(path)
    } else {
      handleOpen()
    }
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid #E0E0E0',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== 2) resetFormData()

          switch (newValue) {
            case 0:
              router.push('/')
              break
            case 1:
              router.push('/search')
              break
            case 2:
              checkUserLogin('/posts')
              break
            case 3:
              checkUserLogin('/notifications')
              break
            case 4:
              checkUserLogin('/my-page')
              break
          }
        }}
      >
        <BottomNavigationAction
          label={<Typography sx={{ fontSize: 11 }}>ホーム</Typography>}
          icon={<HomeIcon sx={{ fontSize: 25 }} />}
          disableRipple
        />
        <BottomNavigationAction
          label={<Typography sx={{ fontSize: 11 }}>検索</Typography>}
          icon={<SearchIcon sx={{ fontSize: 25 }} />}
          disableRipple
        />
        <BottomNavigationAction
          label={<Typography sx={{ fontSize: 11 }}>投稿</Typography>}
          icon={<AddBoxIcon sx={{ fontSize: 25 }} />}
          disableRipple
        />
        <BottomNavigationAction
          label={<Typography sx={{ fontSize: 11 }}>お知らせ</Typography>}
          icon={<NotificationsIcon sx={{ fontSize: 25 }} />}
          disableRipple
        />
        <BottomNavigationAction
          label={<Typography sx={{ fontSize: 11 }}>マイページ</Typography>}
          icon={<PersonIcon sx={{ fontSize: 30 }} />}
          disableRipple
        />
      </BottomNavigation>
      <LoginModal open={open} handleClose={handleClose} />
    </Box>
  )
}

export default Footer
