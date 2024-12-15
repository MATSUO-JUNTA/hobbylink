'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  Container,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { z } from 'zod'
import Error from '../components/Error'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import ValidationMessage from '../components/ValidationMessage'
import { FormContext, Form } from '@/contexts/FormContext'
import { NotificationContext } from '@/contexts/NotificationContext'
import { fetcher } from '@/utils/fetcher'
import {
  categoriesUrl,
  createPostUrl,
  updatePostUrl,
  editPostUrl,
} from '@/utils/urls'

type postFormProps = {
  postId?: string
}

type categoryProps = {
  id: string
  name: string
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 30 * 4.5 + 9,
      width: 150,
    },
  },
}

const PostForm = ({ postId }: postFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { formData, setField } = useContext(FormContext)
  const router = useRouter()
  const { setNotification } = useContext(NotificationContext)
  const { data: session } = useSession()

  const schema = z.object({
    image: z.custom<File>().refine((file) => file && file.size > 0, {
      message: '画像をアップロードしてください。',
    }),
    content: z
      .string()
      .min(1, '投稿内容を入力してください。')
      .max(500, '投稿内容は500文字以内で入力してください。'),
    category: z.string().min(1, 'カテゴリーを選択してください。'),
    products: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          details: z.string(),
          price: z.number(),
          image: z.string().optional(),
          productUrl: z.string(),
        }),
      )
      .max(10, 'おすすめ商品は10個まで選択可能です。'),
  })

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<Form>({
    defaultValues: formData,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setValue('image', formData.image)
    setValue('content', formData.content)
    setValue('category', formData.category)
    setValue('products', formData.products)
    trigger('products')
  }, [formData, setValue, trigger])

  const onSubmit = (data: Form) => {
    // ローディング開始
    setIsLoading(true)
    const formData = new FormData()
    if (data.image) {
      formData.append('image', data.image)
    }
    formData.append('content', data.content)
    formData.append('category_id', data.category)
    formData.append('products', JSON.stringify(data.products))
    const url = postId ? updatePostUrl(postId) : createPostUrl
    const method = postId ? 'patch' : 'post'

    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': session?.user.token,
      },
    })
      .then(() => {
        setNotification({
          message: postId
            ? '投稿の編集が成功しました。'
            : '投稿が成功しました。',
          severity: 'info',
          pathname: '/',
        })
        if (postId) {
          mutate(editPostUrl(postId))
        }
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        setNotification({
          message: postId
            ? '投稿の編集に失敗しました。'
            : '投稿に失敗しました。',
          severity: 'error',
          pathname: '/',
        })
        router.push('/')
      })
      .finally(() => {
        // ローディング終了
        setIsLoading(false)
      })
  }

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files || files.length === 0) {
      return
    }

    const file = files[0]

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      return file
    } else {
      return null
    }
  }
  const { data, error } = useSWR(categoriesUrl(false), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 11 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
            投稿画像
          </Typography>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 0.8',
                    mb: 2,
                    border: field.value
                      ? '1px solid #F5F5F5'
                      : '1px solid #666666',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {field.value ? (
                    <Image
                      src={URL.createObjectURL(field.value)}
                      alt="image"
                      fill
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ color: '#aaa' }}>
                      画像をアップロードしてください
                    </Typography>
                  )}
                </Box>
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    fontSize: 11,
                    color: '#666666',
                    borderColor: '#666666',
                  }}
                >
                  ファイルをアップロード
                  <VisuallyHiddenInput
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = handleInputImage(e)
                      if (file) {
                        field.onChange(file)
                        setField('image', file)
                      }
                    }}
                  />
                </Button>
              </>
            )}
          />
          {errors.image && errors.image.message && (
            <ValidationMessage message={errors.image.message} />
          )}

          <Typography variant="body2" sx={{ mt: 5, mb: 1, fontWeight: 'bold' }}>
            投稿内容
          </Typography>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-multiline-static"
                multiline
                rows={5}
                placeholder="あなたの趣味について入力してください"
                sx={{
                  width: '100%',
                }}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  setField('content', e.target.value)
                }}
              />
            )}
          />
          {errors.content && errors.content.message && (
            <ValidationMessage message={errors.content.message} />
          )}

          <Typography variant="body2" sx={{ mt: 5, mb: 1, fontWeight: 'bold' }}>
            カテゴリー
          </Typography>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl size="small" variant="outlined">
                <Select
                  {...field}
                  label="category"
                  displayEmpty
                  input={<OutlinedInput />}
                  sx={{
                    height: 35,
                    fontSize: 13,
                  }}
                  MenuProps={MenuProps}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    setField('category', e.target.value)
                  }}
                >
                  <MenuItem value="" disabled>
                    <Typography sx={{ fontSize: 13, color: '#aaaaaa' }}>
                      カテゴリーを選択
                    </Typography>
                  </MenuItem>
                  {data.map((category: categoryProps) => (
                    <MenuItem
                      key={category.id}
                      value={category.id.toString()}
                      sx={{ fontSize: 13 }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.category && errors.category.message && (
            <ValidationMessage message={errors.category.message} />
          )}

          <Typography variant="body2" sx={{ mt: 5, mb: 1, fontWeight: 'bold' }}>
            おすすめ商品
          </Typography>

          <Link href="/posts/search">
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              sx={{
                width: 150,
                height: 35,
                color: '#666666',
                borderColor: '#666666',
              }}
            >
              商品を追加
            </Button>
          </Link>
          {isSubmitted && errors.products && errors.products.message && (
            <ValidationMessage message={errors.products.message} />
          )}

          <Grid container spacing={4} sx={{ mt: 3 }}>
            {formData.products &&
              formData.products.map((product) => (
                <Grid
                  size={{ xs: 6, sm: 4 }}
                  key={product.id}
                  sx={{ cursor: 'pointer' }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    selected={false}
                    deletable={true}
                  />
                </Grid>
              ))}
          </Grid>

          <Button
            type="submit"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              width: '100%',
              fontSize: 13,
              mt: 5,
            }}
          >
            {postId ? '編集' : '投稿'}
          </Button>
        </form>
      )}
    </Container>
  )
}

export default PostForm
