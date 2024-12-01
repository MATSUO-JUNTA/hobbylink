'use client'

import { Tab, Tabs, Box } from '@mui/material'
import { useState } from 'react'
import HomePosts from './HomePosts'
import { newPostsUrl, recommendedPostsUrl } from '@/utils/urls'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Box>
  )
}

const Home = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            width: '100%',
            maxWidth: 720,
          }}
        >
          <Tab label="新着" />
          <Tab label="おすすめ" />
        </Tabs>
      </Box>

      <Box sx={{ borderBottom: '1px solid #999999', mb: 3 }} />

      <TabPanel value={value} index={0}>
        <HomePosts url={newPostsUrl} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HomePosts url={recommendedPostsUrl} />
      </TabPanel>
    </>
  )
}

export default Home
