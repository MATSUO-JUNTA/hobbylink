'use client'

import {
  Typography,
  Avatar,
  Container,
  Box,
  Button,
  Tab,
  Tabs,
} from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'
import MyPagePosts from '../../components/MyPagePosts'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import { fetcher } from '@/utils/fetcher'
import { getUserByIdUrl, getUserPostsUrl, getLikePostsUrl } from '@/utils/urls'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

type user = {
  id: number
  name: string
  image: string
  bio: string
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
const MyPage = () => {
  const [value, setValue] = useState(0)
  const { id } = useParams<{ id: string }>()
  const { data: session } = useSession()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const { data, error } = useSWR<user>(getUserByIdUrl(id), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={data.image} sx={{ width: 80, height: 80, mr: 2 }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {data.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold', mr: 0.3 }}
          >
            {100}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: '#666666', mr: 1 }}
          >
            フォロー中
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontWeight: 'bold', mr: 0.3 }}
          >
            {100}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: '#666666' }}
          >
            フォロワー
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ overflowWrap: 'break-word', mb: 3 }}>
        {data.bio}
      </Typography>
      {Number(session?.user.id) == data.id ? (
        <Link href={`/my-page/${id}/edit`}>
          <Button
            variant="contained"
            sx={{ width: '100%', backgroundColor: 'black', py: 1.1, mb: 3 }}
          >
            <Typography sx={{ color: 'white', fontSize: 12 }}>
              プロフィールを編集
            </Typography>
          </Button>
        </Link>
      ) : (
        session?.user && (
          <Button
            variant="contained"
            sx={{ width: '100%', backgroundColor: 'black', py: 1.1, mb: 3 }}
            // onClick={}
          >
            <Typography sx={{ color: 'white', fontSize: 12 }}>
              フォロー
            </Typography>
          </Button>
        )
      )}
      <Tabs value={value} onChange={handleChange}>
        <Tab label="投稿" />
        <Tab label="いいね" />
      </Tabs>
      <Box sx={{ borderBottom: '1px solid #999999', mb: 1 }} />

      <TabPanel value={value} index={0}>
        <MyPagePosts apiUrl={getUserPostsUrl(id)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyPagePosts apiUrl={getLikePostsUrl(id)} />
      </TabPanel>
    </Container>
  )
}

export default MyPage