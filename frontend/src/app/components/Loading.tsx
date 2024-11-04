import { Box } from '@mui/material'
import Image from 'next/image'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Image src="/loading.svg" alt="Loading..." width={90} height={90}></Image>
    </Box>
  )
}

export default Loading
