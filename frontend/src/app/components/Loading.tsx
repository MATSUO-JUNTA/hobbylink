import { Box } from '@mui/material'
import Image from 'next/image'

type LoadingProps = {
  align?: 'center' | 'top'
  height?: string | number
}

const Loading = ({
  align = 'center',
  height = 'calc(100vh - 64px)',
}: LoadingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: align,
        height: height,
      }}
    >
      <Image src="/loading.svg" alt="Loading..." width={90} height={90}></Image>
    </Box>
  )
}

export default Loading
