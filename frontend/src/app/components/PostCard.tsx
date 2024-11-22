import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShareIcon from '@mui/icons-material/Share'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Box,
} from '@mui/material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type PostCardProps = {
  id: number
  image: string
  content: string
  createdAt: string
  userId: number
  userName: string
  userImage: string
}

const PostCard = (props: PostCardProps) => {
  const [isLike, setIsLike] = useState(false)

  const handleLike = () => {
    setIsLike(!isLike)
  }
  const handleShare = () => {}

  return (
    <Card sx={{ position: 'relative' }}>
      <Link href={`/posts/${props.id}`}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 240,
          }}
        >
          <Image
            src={props.image}
            alt=""
            fill
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            sizes="(max-width: 600px) 85%, 
            　　　　(max-width: 960px) 43%　
            　　　　(max-width: 1280px) 28%, 
            　　　　21%"
          />
        </Box>
      </Link>

      <Link href={`/my-page/${props.userId}`}>
        <Box
          sx={{
            position: 'absolute',
            top: 200,
            left: 10,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={props.userImage}
            sx={{ width: 33, height: 33, mr: 1, border: '1px, solid, white' }}
          ></Avatar>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 13,
            }}
          >
            {props.userName}
          </Typography>
        </Box>
      </Link>

      <Link href={`/posts/${props.id}`}>
        <CardContent sx={{ height: 80, pt: 1.3 }}>
          <Typography variant="caption" sx={{ color: '#666666' }}>
            {props.createdAt}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              mt: 0.5,
            }}
          >
            {props.content}
          </Typography>
        </CardContent>
      </Link>

      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#666666' }}>
          <IconButton sx={{ width: 25 }} onClick={handleLike}>
            <motion.div
              whileTap={{
                scale: 1.6,
              }}
              initial={{ scale: 1 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {isLike ? (
                <FavoriteIcon sx={{ color: 'red', fontSize: 21.7 }} />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 21.7 }} />
              )}
            </motion.div>
          </IconButton>

          <Typography component="span" variant="body2" sx={{ mr: 1.2 }}>
            {100}
          </Typography>

          <Link href={`/posts/${props.id}`}>
            <IconButton sx={{ width: 25 }}>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography component="span" variant="body2">
              {100}
            </Typography>
          </Link>
        </Box>
        <IconButton onClick={handleShare}>
          <ShareIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard
