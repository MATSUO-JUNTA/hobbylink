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
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useSWR, { mutate } from 'swr'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { fetcher } from '@/utils/fetcher'
import { getNotificationUrl, updateNotificationUrl } from '@/utils/urls'

type Notification = {
  id: number
  postId: number
  userId: number
  notificationType: string
  read: boolean
  createdAt: string
  notifiedBy: {
    id: number
    image: string
    name: string
  }
}

const Notifications = () => {
  const { data: session } = useSession()
  const { data, error } = useSWR(getNotificationUrl, (url) =>
    fetcher(url, session?.user?.token),
  )

  const handleSetNotificationRead = async (id: number) => {
    try {
      await axios.patch(updateNotificationUrl(id.toString()), null, {
        headers: {
          'auth-token': session?.user.token,
        },
      })
      mutate([getNotificationUrl, session?.user?.token])
    } catch (err) {
      console.log(err)
    }
  }

  if (error) return <Error />
  if (!data) return <Loading />

  const notifications: Notification[] = camelcaseKeys(data)

  return (
    <List sx={{ py: 0 }}>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Box
            key={notification.id}
            sx={{
              backgroundColor: notification.read ? 'none' : '#dceefb',
            }}
          >
            <ListItem
              alignItems="flex-start"
              sx={{ width: '100%', py: 0 }}
              onClick={() => {
                if (!notification.read) {
                  handleSetNotificationRead(notification.id)
                }
              }}
            >
              <Link href={`my-page/${notification.notifiedBy.id}`}>
                <ListItemAvatar>
                  <Avatar
                    alt={notification.notifiedBy.name}
                    src={notification.notifiedBy.image}
                  />
                </ListItemAvatar>
              </Link>
              <Link
                href={
                  notification.postId
                    ? `posts/${notification.postId}`
                    : `my-page/${notification.userId}`
                }
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        overflowWrap: 'break-word',
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {`${notification.notifiedBy.name}`}
                      </Typography>
                      さんが
                      {notification.notificationType === 'フォロー'
                        ? 'あなたをフォローしました。'
                        : `あなたの投稿に${notification.notificationType}しました。`}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ fontSize: 13 }}>
                      {notification.createdAt}
                    </Typography>
                  }
                />
              </Link>
            </ListItem>
            <Divider
              variant="inset"
              component="li"
              sx={{ m: 0, width: '100%' }}
            />
          </Box>
        ))
      ) : (
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          お知らせは見つかりませんでした。
        </Typography>
      )}
    </List>
  )
}

export default Notifications
