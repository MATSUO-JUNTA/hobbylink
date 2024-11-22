'use client'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Typography, Container, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import camelcaseKeys from 'camelcase-keys'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import { fetcher } from '@/utils/fetcher'
import { getProductByIdUrl } from '@/utils/urls'

type Product = {
  id: number
  image: string
  name: string
  details: string
  price: number
  productUrl: string
  posts: [
    {
      id: string
      image: string
    },
  ]
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error } = useSWR(getProductByIdUrl(id), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const product: Product = camelcaseKeys(data)

  return (
    <>
      <NavigationHeader title="商品" />
      <Container
        maxWidth="sm"
        sx={{
          mb: 11,
          px: 0,
        }}
      >
        <Box sx={{ width: '100%', aspectRatio: '1 / 0.7', mb: 3 }}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box sx={{ width: '94%', m: '0 auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.7 }}>
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: 'red', mb: 0.8 }}
          >
            ￥{product.price}
          </Typography>
          <Typography variant="body2" sx={{ mb: 5, whiteSpace: 'pre-line' }}>
            {product.details}
          </Typography>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            href={product.productUrl}
            target="_brank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              width: '100%',
              mb: 5,
            }}
          >
            <Typography variant="body2"> 購入サイトへ</Typography>
          </Button>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
            関連する投稿
          </Typography>
          <Grid container spacing={3}>
            {product.posts &&
              product.posts.map((post) => (
                <Grid
                  key={post.id}
                  size={{ xs: 6, sm: 4 }}
                  sx={{ cursor: 'pointer' }}
                >
                  <Link href={`/posts/${post.id}`}>
                    <Box
                      sx={{ position: 'relative', width: '100%', height: 150 }}
                    >
                      <Image
                        src={post.image}
                        alt={post.id}
                        fill
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 3,
                        }}
                      />
                    </Box>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default ProductDetail
