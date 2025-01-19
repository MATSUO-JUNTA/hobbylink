'use client'

import CheckIcon from '@mui/icons-material/Check'
import { Snackbar, Alert, Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { createContext, useState, useEffect } from 'react'

type NotificationProviderProps = {
  children: React.ReactNode
}

type Notification = {
  message: null | string
  severity: null | 'info' | 'error'
  pathname: null | string
}

type NotificationContextType = {
  setNotification: (props: Notification) => void
}

const NotificationContext = createContext<NotificationContextType>({
  setNotification: () => {},
})

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification>({
    message: null,
    severity: null,
    pathname: null,
  })
  const [open, setOpen] = useState(true)
  const pathName = usePathname()

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setNotification({ message: null, severity: null, pathname: null })
  }

  useEffect(() => {
    if (notification.pathname === pathName) {
      setOpen(true)
    }
  }, [notification, pathName])

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {notification.severity && (
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            sx={{
              left: { lg: '61%' },
            }}
          >
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity={notification.severity}
              sx={{
                width: 260,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationContext, NotificationProvider }
