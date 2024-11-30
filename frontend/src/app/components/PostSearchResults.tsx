'use client'

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  InputAdornment,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import camelcaseKeys from 'camelcase-keys'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import PostCard from '@/app/components/PostCard'
import { fetcher, getKey } from '@/utils/fetcher'
import { searchPostsUrl } from '@/utils/urls'

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

const PostSearchResults = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ref, inView } = useInView()
  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, searchPostsUrl) +
      '&' +
      (searchParams.get('searchTerm')
        ? `search_term=${searchParams.get('searchTerm')}`
        : `category_id=${searchParams.get('categoryId')}`),
    fetcher,
  )

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams({ searchTerm: searchTerm })
    router.push(`/search/search-results?${params}`)
  }

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
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E0E0E0',
          mb: 4,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <IconButton size="small" onClick={router.back}>
              <ArrowBackSharpIcon sx={{ color: '#666666' }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: '90%',
            }}
          >
            <TextField
              size="small"
              placeholder="キーワードを入力してください"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: { height: 33, width: '100%' },
                },
              }}
              sx={{ width: '100%', backgroundColor: 'white' }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleSearch((e.target as HTMLInputElement).value)
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '85%', mx: 'auto', mb: 11 }}>
        {posts.length > 0 ? (
          <Box>
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
          </Box>
        ) : (
          !isValidating && (
            <Typography
              variant="body2"
              sx={{ color: '#666666', textAlign: 'center' }}
            >
              検索結果が見つかりませんでした。
            </Typography>
          )
        )}
        {!isValidating ? <Box ref={ref} /> : <Loading height="" />}
      </Box>
    </>
  )
}

export default PostSearchResults
