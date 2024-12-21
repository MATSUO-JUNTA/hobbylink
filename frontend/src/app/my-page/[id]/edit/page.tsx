'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Typography,
  Avatar,
  Container,
  Box,
  Button,
  styled,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { z } from 'zod'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import ValidationMessage from '@/app/components/ValidationMessage'
import { NotificationContext } from '@/contexts/NotificationContext'
import { fetcher } from '@/utils/fetcher'
import { imageFetcher } from '@/utils/imageFetcher'
import { getUserByIdUrl, updateUserUrl } from '@/utils/urls'

type user = {
  id: number
  name: string
  image: string
  bio: string
}

type form = {
  image: File | null
  name: string
  bio: string
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

const fontStyle = { fontSize: 13, color: '#666666', mt: 4, mb: 1 }

const EditMyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, update } = useSession()
  const { setNotification } = useContext(NotificationContext)
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const schema = z.object({
    image: z.custom<File>().refine((file) => file.size > 0, {
      message: 'プロフィール画像は必須です',
    }),
    name: z.string().min(1, 'ユーザー名を入力してください。'),
    bio: z.string().min(1, '自己紹介を入力してください。'),
  })

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

  const { data, error } = useSWR<user>(getUserByIdUrl(id), fetcher)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<form>({
    defaultValues: {
      name: data?.name ? data.name : '',
      bio: data?.bio ? data.bio : '',
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (data) {
      imageFetcher(data?.image).then((file) => {
        if (file) {
          setValue('image', file)
        }
      })
      setValue('name', data.name)
      setValue('bio', data.bio)
    }
  }, [data, setValue])

  const onSubmit = (data: form) => {
    // ローディング開始
    setIsLoading(true)
    const formData = new FormData()
    if (data.image) {
      formData.append('user[image]', data.image)
    }
    formData.append('user[name]', data.name)
    formData.append('user[bio]', data.bio)

    axios
      .patch(updateUserUrl(id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': session?.user.token,
        },
      })
      .then((res) => {
        setNotification({
          message: '編集が成功しました。',
          severity: 'info',
          pathname: `/my-page/${id}`,
        })
        update({
          name: res.data.name,
          bio: res.data.bio,
          image: res.data.image,
        })
        mutate(getUserByIdUrl(id))
      })
      .catch((err) => {
        console.log(err)
        setNotification({
          message: '編集に失敗しました。',
          severity: 'error',
          pathname: `/my-page/${id}`,
        })
      })
      .finally(() => {
        // ローディング終了
        setIsLoading(false)
        router.push(`/my-page/${id}`)
      })
  }

  if (error) return <Error />
  if (!data) return <Loading />

  if (!session || session.user.id.toString() !== id) {
    router.push('/not-found')
    return null
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <NavigationHeader title="プロフィール編集" />
          <Container maxWidth="sm" sx={{ mt: 4, mb: 11 }}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={
                      field.value ? URL.createObjectURL(field.value) : undefined
                    }
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    sx={{
                      fontSize: 11,
                      color: '#666666',
                      borderColor: '#666666',
                    }}
                  >
                    プロフィール写真を変更
                    <VisuallyHiddenInput
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = handleInputImage(e)
                        if (file) field.onChange(file)
                      }}
                    />
                  </Button>
                </Box>
              )}
            />
            {errors.image && errors.image.message && (
              <ValidationMessage message={errors.image.message} />
            )}

            <Typography sx={fontStyle}>ユーザー名</Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  sx={{ width: '100%', p: 0 }}
                />
              )}
            />
            {errors.name && errors.name.message && (
              <ValidationMessage message={errors.name.message} />
            )}

            <Typography sx={fontStyle}>自己紹介</Typography>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={5}
                  sx={{
                    width: '100%',
                  }}
                />
              )}
            />
            {errors.bio && errors.bio.message && (
              <ValidationMessage message={errors.bio.message} />
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: 'black',
                color: 'white',
                mt: 5,
              }}
            >
              保存
            </Button>
          </Container>
        </form>
      )}
    </>
  )
}

export default EditMyPage
