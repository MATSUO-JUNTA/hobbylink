import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  CircularProgress,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useState, useContext, useEffect } from 'react'
import { NotificationContext } from '@/contexts/NotificationContext'

type LoginModalProps = {
  open: boolean
  handleClose: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '0.5px solid #666666',
  borderRadius: 1,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const LoginModal = ({ open, handleClose }: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setNotification } = useContext(NotificationContext)
  const { status } = useSession()

  useEffect(() => {
    const showMessage = localStorage.getItem('showMessage')

    if (showMessage === 'false' && status === 'authenticated') {
      setNotification({
        message: 'ログインが成功しました。',
        severity: 'info',
        pathname: '/',
      })
      localStorage.setItem('showMessage', 'true')
    }
  }, [status, setNotification])

  const handleSignIn = async (provider: string) => {
    // ローディング開始
    setIsLoading(true)

    try {
      await signIn(provider)
    } catch (err) {
      console.log(err)
      setNotification({
        message: 'ログインに失敗しました。',
        severity: 'error',
        pathname: '/',
      })
    } finally {
      // ローディング終了
      setIsLoading(false)
      handleClose()
    }
  }

  return (
    <Modal open={open}>
      <Box sx={style}>
        <IconButton
          size="small"
          sx={{ position: 'absolute', top: 3, right: 5 }}
          onClick={handleClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <Image src="/logo.svg" alt="logo" width={135} height={50} />
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 11,
            mt: 2,
          }}
        >
          あなたの趣味を共有し、新しい趣味を見つけましょう。
        </Typography>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            padding: 1.2,
            borderColor: 'gray',
            width: '100%',
            ':hover': { backgroundColor: '#f0f0f0' },
          }}
          disableRipple
          onClick={() => !isLoading && handleSignIn('google')}
        >
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Image src="/google.png" alt="google" width={20} height={20} />
              <Typography
                sx={{
                  textTransform: 'none',
                  color: 'black',
                  marginLeft: 1,
                  fontWeight: 'bold',
                  fontSize: 13.5,
                }}
              >
                Login with Google
              </Typography>
            </>
          )}
        </Button>
        <Typography
          sx={{
            mt: 2,
            textAlign: 'center',
            fontSize: 11,
          }}
        >
          <Link href="/terms" onClick={handleClose}>
            <Typography
              component="span"
              sx={{
                fontSize: 'inherit',
                color: '#1E90FF',
              }}
            >
              利用規約
            </Typography>
          </Link>
          と
          <Link href="privacy" onClick={handleClose}>
            <Typography
              component="span"
              sx={{
                fontSize: 'inherit',
                color: '#1E90FF',
              }}
            >
              プライバシーポリシー
            </Typography>
          </Link>
          に同意した上でログインしてください。
        </Typography>
      </Box>
    </Modal>
  )
}

export default LoginModal
