import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import Error from './Error'
import Loading from './Loading'
import { fetcher } from '@/utils/fetcher'

type MyPagePostsProps = {
  apiUrl: string
}

type userPosts = {
  id: number
  image: string
}

const MyPagePosts = ({ apiUrl }: MyPagePostsProps) => {
  const { data, error } = useSWR<userPosts[]>(apiUrl, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Grid container spacing={2}>
      {data &&
        data.map((post) => (
          <Grid
            key={post.id}
            size={{ xs: 6, sm: 4 }}
            sx={{ cursor: 'pointer' }}
          >
            <Link href={`/posts/${post.id}`}>
              <Box sx={{ position: 'relative', width: '100%', height: 150 }}>
                <Image
                  src={post.image}
                  alt=""
                  fill
                  style={{ width: '100%', height: '100%', borderRadius: 3 }}
                />
              </Box>
            </Link>
          </Grid>
        ))}
    </Grid>
  )
}

export default MyPagePosts
