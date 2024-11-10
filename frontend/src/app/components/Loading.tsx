import { Box } from '@mui/material'
import Image from 'next/image'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <Image src="/loading.svg" alt="Loading..." width={90} height={90}></Image>
    </Box>
  )
}

export default Loading
