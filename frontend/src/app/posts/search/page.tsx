'use client'

import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import camelcaseKeys from 'camelcase-keys'
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import useSWR from 'swr'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import ProductCard from '@/app/components/ProductCard'
import ValidationMessage from '@/app/components/ValidationMessage'
import { FormContext, Product } from '@/contexts/FormContext'
import { fetcher } from '@/utils/fetcher'
import { searchProductsUrl } from '@/utils/urls'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { formData, addProducts } = useContext(FormContext)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(
    formData.products,
  )
  const router = useRouter()

  const validateKeyword = (keyword: string) => {
    if (keyword.length < 2) {
      setErrorMessage('キーワードは2文字以上で入力してください。')
      return false
    } else {
      setErrorMessage('')
      return true
    }
  }

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((currentProd) => currentProd.productUrl === product.productUrl)
        ? prev.filter(
            (currentProd) => currentProd.productUrl !== product.productUrl,
          )
        : [...prev, product],
    )
  }

  const handleAddProducts = () => {
    addProducts(selectedProducts)
    router.back()
  }

  // 楽天商品データを取得
  const { data, error, isLoading } = useSWR(
    keyword
      ? searchProductsUrl +
          new URLSearchParams({
            keyword: keyword,
          })
      : null,
    fetcher,
  )

  const products = data ? camelcaseKeys(data) : []

  return (
    <>
      <NavigationHeader title="商品を検索" />

      {error ? (
        <Error />
      ) : (
        <Container
          maxWidth="sm"
          sx={{
            mt: 4,
            mb: 11,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Box sx={{ flex: 1 }}>
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
                sx={{ width: '100%', backgroundColor: 'white' }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const keyword = (e.target as HTMLInputElement).value

                  if (e.key === 'Enter' && validateKeyword(keyword)) {
                    setKeyword(keyword)
                  }
                }}
              />
            </Box>
            {errorMessage && <ValidationMessage message={errorMessage} />}

            {isLoading ? (
              <Loading align="top" />
            ) : keyword && products.length === 0 ? (
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                検索結果が見つかりませんでした。
              </Typography>
            ) : (
              <Grid container spacing={5} sx={{ mt: 4 }}>
                {products.map((product: Product) => (
                  <Grid
                    size={{ xs: 6, sm: 4 }}
                    key={product.id}
                    onClick={() => addProduct(product)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      selected={selectedProducts.some(
                        (selected: Product) =>
                          selected.productUrl === product.productUrl,
                      )}
                      deletable={false}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: 'black',
                color: 'white',
              }}
              disabled={selectedProducts.length === 0}
              onClick={handleAddProducts}
            >
              {selectedProducts.length} 個の商品を追加
            </Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default Search
