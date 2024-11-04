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
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'
import Error from '../components/Error'
import Loading from '../components/Loading'
import ValidationMessage from '../components/ValidationMessage'
import { fetcher } from '@/utils/fetcher'
import { categoriesUrl } from '@/utils/urls'

type product = {
  id: number
  name: string
  price: string
  image: string
}

type PostForm = {
  image: File
  content: string
  category: string
  products: product[]
}

type categoryProps = {
  id: string
  image: string
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

const Posts = () => {
  const router = useRouter()
  const schema = z.object({
    image: z.custom<File>().refine((file) => file && file.size > 0, {
      message: '画像をアップロードしてください。',
    }),
    content: z
      .string()
      .min(1, '投稿内容を入力してください。')
      .max(200, '投稿内容は200文字以内で入力してください。'),
    category: z.string().min(1, 'カテゴリーを選択してください。'),
    products: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          price: z.string(),
          image: z.string(),
        }),
      )
      .max(10, 'おすすめ商品は10個まで選択可能です。'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostForm>({
    defaultValues: {
      image: undefined,
      content: '',
      category: '',
      products: [],
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: PostForm) => {
    console.log(data)
    // const postUrl = 'http://localhost:3000/api/v1/posts/create'
    // axios
    //   .post(postUrl, data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'auth-token': 'token',
    //     },
    //   })
    //   .then(() => {
    //     console.log('成功')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    router.push('/')
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

  const { data, error } = useSWR(categoriesUrl, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 11 }}>
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
                sx={{ fontSize: 11, color: '#666666', borderColor: '#666666' }}
              >
                ファイルをアップロード
                <VisuallyHiddenInput
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = handleInputImage(e)
                    if (file) field.onChange(file)
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
        {errors.products && errors.products.message && (
          <ValidationMessage message={errors.products.message} />
        )}

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
          投稿
        </Button>
      </form>
    </Container>
  )
}

export default Posts
