import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

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
        <Image src="/logo.png" alt="logo" width={120} height={45} />
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
          onClick={() => signIn('google')}
        >
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
