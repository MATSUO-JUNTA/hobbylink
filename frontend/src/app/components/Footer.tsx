'use client'

import AddBoxIcon from '@mui/icons-material/AddBox'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
} from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const getInitValue = (pathname: string) => {
  if (pathname === '/') return 0
  if (pathname.startsWith('/search')) return 1
  if (pathname.startsWith('/posts')) return 2
  if (pathname.startsWith('/notifications')) return 3
  if (pathname.startsWith('/mypage')) return 4
  return 0
}

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(getInitValue(pathname))

  useEffect(() => setValue(getInitValue(pathname)), [pathname])

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
          switch (newValue) {
            case 0:
              router.push('/')
              break
            case 1:
              router.push('/search')
              break
            case 2:
              router.push('/posts')
              break
            case 3:
              router.push('/notifications')
              break
            case 4:
              router.push('/my-page')
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
    </Box>
  )
}

export default Footer
