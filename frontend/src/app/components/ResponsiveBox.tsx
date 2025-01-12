import { Box } from '@mui/material'

const ResponsiveBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', lg: 'calc(100% - 280px)' },
        ml: { xs: 0, lg: '280px' },
      }}
    >
      {children}
    </Box>
  )
}

export default ResponsiveBox
