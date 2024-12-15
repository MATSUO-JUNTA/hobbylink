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
import { useState, useContext, useEffect, useRef } from 'react'
import LoginModal from './LoginModal'
import { FormContext } from '@/contexts/FormContext'

const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(0)
  const { resetFormData } = useContext(FormContext)
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { data: session } = useSession()
  const prevPathname = useRef(pathname)
  const resetDone = useRef(false)

  useEffect(() => {
    const prev = prevPathname.current
    const skipReset =
      (prev === '/posts/search' && pathname === '/posts') ||
      (prev === '/posts' && pathname === '/posts/search') ||
      (prev === '/posts/search' && /\/posts\/\d+\/edit$/.test(pathname)) ||
      (/\/posts\/\d+\/edit$/.test(prev) && pathname === '/posts/search')

    if (prev !== pathname) {
      resetDone.current = false
      prevPathname.current = pathname
    } else {
      resetDone.current = true
    }

    if (!skipReset && !resetDone.current) {
      resetFormData()
    }
  }, [pathname, resetFormData])

  const checkUserLogin = (path: string) => {
    if (session?.user) {
      router.push(path)
    } else {
      handleOpen()
    }
  }

  const isPathMatch = /\/posts\/\d+\/comments$/.test(pathname)

  if (isPathMatch) return <></>

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
          setValue(newValue)
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
              checkUserLogin(`/my-page/${session?.user.id}`)
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
