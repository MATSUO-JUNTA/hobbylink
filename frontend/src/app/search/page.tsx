'use client'

import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { fetcher } from '@/utils/fetcher'
import { categoriesUrl } from '@/utils/urls'

type categoryProps = {
  id: number
  image: string
  name: string
}

const PostSearch = () => {
  const router = useRouter()

  const handleSearch = (searchTerm?: string, categorieId?: number) => {
    const params = new URLSearchParams()

    if (searchTerm) params.append('searchTerm', searchTerm)

    if (categorieId) params.append('categorieId', categorieId.toString())

    if (params) {
      router.push(`/search/search-results?${params}`)
    }
  }

  const { data, error } = useSWR(categoriesUrl(true), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 11 }}>
      <Box sx={{ display: 'flex' }}>
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
              style: { height: 35 },
            },
          }}
          sx={{ width: '100%', backgroundColor: 'white', mb: 3 }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleSearch((e.target as HTMLInputElement).value)
            }
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        カテゴリーから選ぶ
      </Typography>
      <Grid container spacing={4}>
        {data &&
          data.map((categorie: categoryProps) => (
            <Grid
              size={{ xs: 6, sm: 4 }}
              key={categorie.id}
              onClick={() => handleSearch('', categorie.id)}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 160,
                  backgroundColor: 'black',
                  borderRadius: 1,
                }}
              >
                <Image
                  src={categorie.image}
                  alt={categorie.name}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: '0.8',
                    borderRadius: 4,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'Translate(-50%,-50%)',
                    textAlign: 'center',
                    width: '90%',
                    color: 'white',
                    fontWeight: 'bold',
                    mt: 1,
                  }}
                >
                  {categorie.name}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default PostSearch
