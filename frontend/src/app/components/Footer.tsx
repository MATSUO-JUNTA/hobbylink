'use client'

import AddBoxIcon from '@mui/icons-material/AddBox'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const Footer = () => {
  const [value, setValue] = useState(0)

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
