'use client'

import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
} from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import { fetcher } from '@/utils/fetcher'
import { getFollowersUrl, getFollowingUrl } from '@/utils/urls'

type Follow = {
  id: string
  image: string
  name: string
  bio: string
}

type FollowListProps = {
  type: 'following' | 'followers'
}

const FollowList = ({ type }: FollowListProps) => {
  const { id } = useParams<{ id: string }>()
  const { data, error } = useSWR<Follow[]>(
    type === 'following' ? getFollowingUrl(id) : getFollowersUrl(id),
    fetcher,
  )

  if (error) return <Error />
  if (!data) return <Loading />
  return (
    <>
      <NavigationHeader
        title={type === 'following' ? 'フォロー中' : 'フォロワー'}
      />
      <List sx={{ py: 0 }}>
        {data.length > 0 ? (
          data.map((following) => (
            <Box key={following.id}>
              <Link href={`/my-page/${following.id}`}>
                <ListItem alignItems="flex-start" sx={{ width: '100%', py: 0 }}>
                  <ListItemAvatar>
                    <Avatar alt={following.name} src={following.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          overflowWrap: 'break-word',
                          mb: 0.5,
                        }}
                      >
                        {following.name}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: 13 }}>
                        {following.bio}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
              <Divider
                variant="inset"
                component="li"
                sx={{ m: 0, width: '100%' }}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            {type === 'following' ? 'フォロー中のユーザー' : 'フォロワー'}
            は見つかりませんでした。
          </Typography>
        )}
      </List>
    </>
  )
}

export default FollowList
