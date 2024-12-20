'use client'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Box,
  Typography,
  Container,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  Paper,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useContext, useEffect } from 'react'
import useSWR from 'swr'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import PostActions from '@/app/components/PostActions'
import ProductCard from '@/app/components/ProductCard'
import { NotificationContext } from '@/contexts/NotificationContext'
import { fetcher } from '@/utils/fetcher'
import { getPostByIdUrl, deletePostUrl } from '@/utils/urls'

type Post = {
  id: number
  image: string
  content: string
  createdAt: string
  likeCount: number
  isLiked: boolean
  commentCount: number
  user: {
    id: number
    image: string
    name: string
  }
  category: {
    id: number
    name: string
  }
  products: [
    {
      id: string
      image: string
      name: string
      price: number
    },
  ]
}
const fontStyle = { fontSize: 12, fontWeight: 'bold', ml: 0.5 }

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { setNotification } = useContext(NotificationContext)
  const router = useRouter()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    handleClose()
    // ローディング開始
    setIsLoading(true)
    axios
      .delete(deletePostUrl(id), {
        headers: {
          'auth-token': session?.user.token,
        },
      })
      .then(() => {
        setNotification({
          message: '投稿の削除が成功しました。',
          severity: 'info',
          pathname: '/',
        })
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        setNotification({
          message: '投稿の削除に失敗しました。',
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

  const { data, error, isValidating, mutate } = useSWR(
    id ? getPostByIdUrl(id) : null,
    (url) => fetcher(url, session?.user?.token),
  )

  useEffect(() => {
    mutate(undefined, { revalidate: true })
  }, [mutate])

  if (error) return <Error />
  if (isValidating && !data) return <Loading />

  const post: Post = camelcaseKeys(data)

  return (
    <>
      <NavigationHeader title="投稿" />
      {isLoading ? (
        <Loading />
      ) : (
        <Container
          maxWidth="sm"
          sx={{
            mb: 11,
            px: 0,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1.1',
              mb: 2.5,
            }}
          >
            <Image
              src={post.image}
              alt={post.user.name}
              fill
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box
            sx={{
              width: '91%',
              m: '0 auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Link href={`/my-page/${post.user.id}`}>
                  <Avatar
                    src={post.user.image}
                    alt={post.user.name}
                    sx={{ mr: 1.5 }}
                  />
                </Link>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {post.user.name}
                  </Typography>
                  <Typography sx={{ color: '#666666', fontSize: 13 }}>
                    {post.createdAt}
                  </Typography>
                </Box>
              </Box>

              {session?.user && Number(session.user.id) === post.user.id && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="メニューを開く">
                    <IconButton
                      size="small"
                      sx={{ mb: 2 }}
                      onClick={handleOpenUserMenu}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Paper>
                    <Menu
                      sx={{ mt: '40px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <Link href={`/posts/${post.id}/edit`}>
                        <MenuItem
                          sx={{
                            px: 1.5,
                            color: '#1E90FF',
                            borderBottom: '1px solid #ddd',
                          }}
                        >
                          <EditOutlinedIcon />
                          <Typography sx={fontStyle}>投稿を編集</Typography>
                        </MenuItem>
                      </Link>
                      <MenuItem
                        sx={{
                          px: 1.5,
                          color: 'red',
                        }}
                        onClick={() => {
                          handleOpen()
                          handleCloseUserMenu()
                        }}
                      >
                        <DeleteOutlineOutlinedIcon />
                        <Typography sx={fontStyle}>投稿を削除</Typography>
                      </MenuItem>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent
                          sx={{
                            width: 230,
                            pb: 1.5,
                            textAlign: 'center',
                            borderBottom: '1px solid #ddd',
                          }}
                        >
                          <Typography
                            sx={{ fontSize: 13.5, fontWeight: 'bold' }}
                          >
                            本当に投稿を削除してもよろしいですか？
                          </Typography>
                        </DialogContent>
                        <DialogActions
                          sx={{ height: 38, justifyContent: 'center' }}
                        >
                          <Button
                            sx={{ fontSize: 12, width: '50%' }}
                            onClick={handleClose}
                            color="primary"
                          >
                            キャンセル
                          </Button>
                          <Button
                            onClick={handleDelete}
                            sx={{ fontSize: 12, width: '50%' }}
                            color="error"
                          >
                            削除
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Menu>
                  </Paper>
                </Box>
              )}
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {post.content}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#666666' }}>
              {post.category.name}
            </Typography>

            <PostActions
              id={id}
              content={post.content}
              isLiked={post.isLiked}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
            />

            <Typography variant="body2" sx={{ my: 2, fontWeight: 'bold' }}>
              おすすめ商品
            </Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              {post.products &&
                post.products.map((product) => (
                  <Grid
                    size={{ xs: 6, sm: 4 }}
                    key={product.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        selected={false}
                        deletable={false}
                      />
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      )}
    </>
  )
}

export default PostDetail
