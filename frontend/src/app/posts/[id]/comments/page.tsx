'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Typography,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  TextField,
} from '@mui/material'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { z } from 'zod'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import { fetcher } from '@/utils/fetcher'
import { commentUrl } from '@/utils/urls'

type form = {
  content: string
}

type commentProps = {
  id: number
  content: string
  createdAt: string
  user: {
    id: number
    image: string
    name: string
  }
}

const Comments = () => {
  const { id } = useParams<{ id: string }>()
  const { data: session } = useSession()

  const schema = z.object({
    content: z.string().min(1),
  })

  const { handleSubmit, control, reset } = useForm<form>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: form) => {
    axios
      .post(commentUrl(id), data, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': session?.user.token,
        },
      })
      .then(() => {
        reset()
        mutate(commentUrl(id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const { data, error } = useSWR(commentUrl(id), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const comments: commentProps[] = camelcaseKeys(data)

  return (
    <>
      <NavigationHeader title="コメント一覧" />
      <Container>
        {comments.map((comment) => (
          <List key={comment.id} sx={{ p: 0, m: 0 }}>
            <ListItem alignItems="flex-start" sx={{ width: '100%', pl: 0 }}>
              <Link href={`/my-page/${comment.user.id}`}>
                <ListItemAvatar>
                  <Avatar alt={comment.user.name} src={comment.user.image} />
                </ListItemAvatar>
              </Link>
              <ListItemText
                primary={
                  <>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {comment.user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        fontSize: 13,
                        color: '#666666',
                        ml: 1,
                      }}
                    >
                      {comment.createdAt}
                    </Typography>
                  </>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      overflowWrap: 'break-word',
                    }}
                  >
                    {comment.content}
                  </Typography>
                }
              />
            </ListItem>
            <Divider
              variant="inset"
              component="li"
              sx={{ m: 0, width: '100%' }}
            />
          </List>
        ))}
      </Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            borderTop: '1px solid #E0E0E0',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 64,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                placeholder="コメント"
                slotProps={{
                  input: {
                    style: { height: 35 },
                  },
                }}
                sx={{
                  width: '75%',
                  backgroundColor: 'white',
                  mr: 1.2,
                }}
              />
            )}
          />
          <Button type="submit" variant="contained">
            送信
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Comments
