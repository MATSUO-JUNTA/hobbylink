'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Box,
  Typography,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Paper,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogTitle,
} from '@mui/material'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { z } from 'zod'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
import { fetcher } from '@/utils/fetcher'
import { commentUrl, commentDetailUrl } from '@/utils/urls'

type form = {
  content: string
}

type commentProps = {
  id: number
  content: string
  createdAt: string
  user: {
    id: number
    image: string
    name: string
  }
}

const fontStyle = { fontSize: 12, fontWeight: 'bold', ml: 0.5 }

const Comments = () => {
  const { id } = useParams<{ id: string }>()
  const { data: session } = useSession()
  const [anchorElUser, setAnchorElUser] = useState<
    Record<number, null | HTMLElement>
  >({})
  const handleOpenUserMenu = (
    commentId: number,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElUser((prev) => ({ ...prev, [commentId]: event.currentTarget }))
  }
  const handleCloseUserMenu = (commentId: number) => {
    setAnchorElUser((prev) => ({ ...prev, [commentId]: null }))
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [editOpen, setEditOpen] = useState(false)
  const handleEditOpen = () => {
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const [commentId, setCommentId] = useState<number>(0)

  const schema = z.object({
    content: z.string().min(1),
  })

  const { handleSubmit, control, reset } = useForm<form>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue,
  } = useForm<form>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: form) => {
    axios
      .post(commentUrl(id), data, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': session?.user.token,
        },
      })
      .then(() => {
        reset()
        mutate(commentUrl(id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onEditSubmit = (data: form) => {
    axios
      .patch(commentDetailUrl(id, commentId.toString()), data, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': session?.user.token,
        },
      })
      .then(() => {
        mutate(commentUrl(id))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        handleEditClose()
      })
  }

  const handleDelete = (commentId: number) => {
    handleClose()
    axios
      .delete(commentDetailUrl(id, commentId.toString()), {
        headers: {
          'auth-token': session?.user.token,
        },
      })
      .then(() => {
        mutate(commentUrl(id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const { data, error } = useSWR(commentUrl(id), fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const comments: commentProps[] = camelcaseKeys(data)

  return (
    <>
      <NavigationHeader title="コメント一覧" />
      <Container>
        {comments.map((comment) => (
          <>
            <List key={comment.id} sx={{ p: 0, m: 0 }}>
              <ListItem alignItems="flex-start" sx={{ width: '100%', pl: 0 }}>
                <Link href={`/my-page/${comment.user.id}`}>
                  <ListItemAvatar>
                    <Avatar alt={comment.user.name} src={comment.user.image} />
                  </ListItemAvatar>
                </Link>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {comment.user.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            fontSize: 13,
                            color: '#666666',
                            ml: 1,
                          }}
                        >
                          {comment.createdAt}
                        </Typography>
                      </Box>
                      {session?.user &&
                        Number(session.user.id) === comment.user.id && (
                          <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="メニューを開く">
                              <IconButton
                                size="small"
                                onClick={(e) =>
                                  handleOpenUserMenu(comment.id, e)
                                }
                              >
                                <MoreVertIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                            <Paper>
                              <Menu
                                sx={{ mt: '40px' }}
                                id={`menu-appbar-${comment.id}`}
                                anchorEl={anchorElUser[comment.id]}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser[comment.id])}
                                onClose={handleCloseUserMenu}
                              >
                                <MenuItem
                                  sx={{
                                    px: 1.5,
                                    color: '#1E90FF',
                                    borderBottom: '1px solid #ddd',
                                  }}
                                  onClick={() => {
                                    setValue('content', comment.content)
                                    setCommentId(comment.id)
                                    handleCloseUserMenu(comment.id)
                                    handleEditOpen()
                                  }}
                                >
                                  <EditOutlinedIcon />
                                  <Typography sx={fontStyle}>
                                    コメントを編集
                                  </Typography>
                                </MenuItem>
                                <MenuItem
                                  sx={{
                                    px: 1.5,
                                    color: 'red',
                                  }}
                                  onClick={() => {
                                    handleOpen()
                                    setCommentId(comment.id)
                                    handleCloseUserMenu(comment.id)
                                  }}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                  <Typography sx={fontStyle}>
                                    コメントを削除
                                  </Typography>
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
                                      sx={{
                                        fontSize: 13.5,
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      本当にコメントを削除してもよろしいですか？
                                    </Typography>
                                  </DialogContent>
                                  <DialogActions
                                    sx={{
                                      height: 38,
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Button
                                      sx={{ fontSize: 12, width: '50%' }}
                                      onClick={handleClose}
                                      color="primary"
                                    >
                                      キャンセル
                                    </Button>
                                    <Button
                                      onClick={() => handleDelete(commentId)}
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
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        overflowWrap: 'break-word',
                      }}
                    >
                      {comment.content}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider
                variant="inset"
                component="li"
                sx={{ m: 0, width: '100%' }}
              />
            </List>
            <Dialog
              open={editOpen}
              onClose={handleEditClose}
              sx={{
                '& .MuiDialog-paper': {
                  width: 500,
                  height: 180,
                  mx: 2,
                },
              }}
            >
              <form onSubmit={handleEditSubmit(onEditSubmit)}>
                <DialogTitle>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                  >
                    コメント編集
                  </Typography>
                </DialogTitle>
                <DialogContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    px: 1,
                    pb: 3,
                  }}
                >
                  <Controller
                    name="content"
                    control={editControl}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        variant="standard"
                        slotProps={{
                          input: {
                            style: { height: 35 },
                          },
                        }}
                        sx={{
                          width: '95%',
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '46%', height: 30, mr: 0.2 }}
                  >
                    保存
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: '46%',
                      height: 30,
                      mr: 1,
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid #B0BEC5',
                    }}
                    onClick={handleEditClose}
                  >
                    キャンセル
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </>
        ))}
      </Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            borderTop: '1px solid #E0E0E0',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 64,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                placeholder="コメント"
                slotProps={{
                  input: {
                    style: { height: 35 },
                  },
                }}
                sx={{
                  width: '75%',
                  backgroundColor: 'white',
                  mr: 1.2,
                }}
              />
            )}
          />
          <Button type="submit" variant="contained">
            送信
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Comments
