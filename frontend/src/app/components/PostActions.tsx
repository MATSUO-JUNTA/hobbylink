import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShareIcon from '@mui/icons-material/Share'
import { Typography, IconButton, Box } from '@mui/material'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { likeUrl } from '@/utils/urls'

type PostActionsProps = {
  id: string
  isLiked: boolean
  likeCount: number
  commentCount: number
}

const PostActions = (props: PostActionsProps) => {
  const { data: session } = useSession()
  const [isLike, setIsLike] = useState(props.isLiked)
  const [likeCount, setLikeCount] = useState(props.likeCount)

  const handleLike = async () => {
    const method = isLike ? 'delete' : 'post'
    try {
      const res = await axios({
        method: method,
        url: likeUrl(props.id.toString()),
        headers: {
          'auth-token': session?.user.token,
        },
      })
      setIsLike(!isLike)
      setLikeCount(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleShare = () => {}

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', color: '#666666' }}>
        <Box sx={{ mb: 0.1 }}>
          <IconButton sx={{ width: 25 }} onClick={handleLike}>
            <motion.div
              whileTap={{
                scale: 1.6,
              }}
              initial={{ scale: 1 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {isLike ? (
                <FavoriteIcon sx={{ color: 'red', fontSize: 20 }} />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }} />
              )}
            </motion.div>
          </IconButton>
          <Typography component="span" sx={{ mr: 1, fontSize: 13.5 }}>
            {likeCount}
          </Typography>
        </Box>

        <Link href={`/posts/${props.id}/comments`}>
          <IconButton sx={{ width: 25 }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 18.5 }} />
          </IconButton>
          <Typography component="span" sx={{ fontSize: 13.5 }}>
            {props.commentCount}
          </Typography>
        </Link>
      </Box>
      <IconButton onClick={handleShare}>
        <ShareIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default PostActions
