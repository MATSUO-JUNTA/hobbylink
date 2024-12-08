import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { Typography, IconButton, Box } from '@mui/material'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import {
  LineShareButton,
  LineIcon,
  XIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
} from 'react-share'
import { likeUrl } from '@/utils/urls'

type PostActionsProps = {
  id: string
  content: string
  isLiked: boolean
  likeCount: number
  commentCount: number
}
const buttonStyle = { marginRight: 11 }

const PostActions = (props: PostActionsProps) => {
  const { data: session } = useSession()
  const [isLike, setIsLike] = useState(props.isLiked)
  const [likeCount, setLikeCount] = useState(props.likeCount)
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${props.id}`

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
      <Box sx={{ mt: 0.5, mr: 0.7 }}>
        <FacebookShareButton
          title={props.content}
          url={shareUrl}
          style={buttonStyle}
        >
          <FacebookIcon size={25} round />
        </FacebookShareButton>
        <TwitterShareButton
          title={props.content}
          url={shareUrl}
          style={buttonStyle}
        >
          <XIcon size={25} round />
        </TwitterShareButton>
        <LineShareButton title={props.content} url={shareUrl}>
          <LineIcon size={25} round />
        </LineShareButton>
      </Box>
    </Box>
  )
}

export default PostActions
