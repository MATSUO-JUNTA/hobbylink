'use client'

import AddBoxIcon from '@mui/icons-material/AddBox'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import {
  useMediaQuery,
  Drawer,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useContext, useEffect, useRef } from 'react'
import LoginModal from './LoginModal'
import { FormContext } from '@/contexts/FormContext'

const NavigationMenu = () => {
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
  const loginNotPaths = ['/', '/search']
  const navItems = [
    {
      label: 'ホーム',
      path: '/',
      icon: <HomeIcon sx={{ fontSize: { xs: 24, lg: 34 } }} />,
    },
    {
      label: '検索',
      path: '/search',
      icon: <SearchIcon sx={{ fontSize: { xs: 24, lg: 34 } }} />,
    },
    {
      label: '投稿',
      path: '/posts',
      icon: <AddBoxIcon sx={{ fontSize: { xs: 24, lg: 34 } }} />,
    },
    {
      label: 'お知らせ',
      path: '/notifications',
      icon: <NotificationsIcon sx={{ fontSize: { xs: 24, lg: 34 } }} />,
    },
    {
      label: 'マイページ',
      path: `/my-page/${session?.user?.id}`,
      icon: <PersonIcon sx={{ fontSize: { xs: 24, lg: 34 } }} />,
    },
  ]

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
    if (loginNotPaths.includes(path) || session?.user) {
      router.push(path)
      return true
    } else {
      handleOpen()
      return false
    }
  }

  const isPathMatch = /\/posts\/\d+\/comments$/.test(pathname)
  const isLgUp = useMediaQuery('(min-width: 1200px)')

  if (isPathMatch && !isLgUp) return <></>

  return (
    <>
      <Drawer
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          backgroundColor: 'white',
          borderRight: '1px solid #E0E0E0',
          zIndex: 999,
        }}
        variant="permanent"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '65px',
            pl: 1.5,
            mb: 1.8,
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={158}
              height={55}
              priority
            />
          </Link>
        </Box>
        <List sx={{ width: 280, pt: 0 }}>
          {navItems.map((navItem, index) => (
            <ListItem
              key={index}
              sx={{ p: 0 }}
              onClick={() => {
                if (checkUserLogin(navItem.path)) {
                  setValue(index)
                }
              }}
            >
              <ListItemButton
                sx={{ py: 1, height: 50 }}
                selected={value === index}
                disableRipple
              >
                <ListItemIcon
                  sx={{
                    minWidth: 45,
                    ml: 1,
                  }}
                >
                  {navItem.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ fontSize: 17 }}>{navItem.label}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          display: { xs: 'block', lg: 'none' },
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          backgroundColor: '#fff',
          borderTop: '1px solid #E0E0E0',
          zIndex: 999,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            const navItem = navItems[newValue]
            if (checkUserLogin(navItem.path)) {
              setValue(newValue)
            }
          }}
        >
          {navItems.map((navItem, index) => (
            <BottomNavigationAction
              key={index}
              label={
                <Typography sx={{ fontSize: 11 }}>{navItem.label}</Typography>
              }
              icon={navItem.icon}
              disableRipple
            />
          ))}
        </BottomNavigation>
      </Box>
      <LoginModal open={open} handleClose={handleClose} />
    </>
  )
}

export default NavigationMenu
