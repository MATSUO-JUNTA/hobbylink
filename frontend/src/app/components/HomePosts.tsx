'use client'

import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import camelcaseKeys from 'camelcase-keys'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'
import Error from './Error'
import Loading from './Loading'
import PostCard from './PostCard'
import { fetcher, getKey } from '@/utils/fetcher'

type HomePostsProps = {
  url: string
}

type PostProps = {
  id: number
  image: string
  content: string
  createdAt: string
  likeCount: number
  isLiked: boolean
  user: {
    id: number
    name: string
    image: string
  }
}

const HomePosts = ({ url }: HomePostsProps) => {
  const { data: session } = useSession()
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, url),
    (url) => fetcher(url, session?.user.token),
  )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (
      !isValidating &&
      inView &&
      data?.[0]?.length > 0 &&
      data?.[data?.length - 1]?.length === 10
    ) {
      setSize(size + 1)
    }
  }, [isValidating, inView, data, size, setSize])

  if (error) return <Error />

  const posts = data ? camelcaseKeys(data.flat()) : []

  return (
    <Box sx={{ width: '85%', mx: 'auto', mb: 11 }}>
      <Grid container spacing={5}>
        {posts &&
          posts.map((post: PostProps) => (
            <Grid
              key={post.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ cursor: 'pointer' }}
            >
              <PostCard
                id={post.id}
                image={post.image}
                content={post.content}
                createdAt={post.createdAt}
                userId={post.user.id}
                userName={post.user.name}
                userImage={post.user.image}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
              />
            </Grid>
          ))}
      </Grid>
      {!isValidating ? <Box ref={ref} /> : <Loading height="" />}
    </Box>
  )
}

export default HomePosts
