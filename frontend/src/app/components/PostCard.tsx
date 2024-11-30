import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import PostActions from './PostActions'

type PostCardProps = {
  id: number
  image: string
  content: string
  createdAt: string
  userId: number
  userName: string
  userImage: string
  likeCount: number
  isLiked: boolean
}

const PostCard = (props: PostCardProps) => {
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
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              mt: 0.5,
              fontSize: 13.5,
            }}
          >
            {props.content}
          </Typography>
        </CardContent>
      </Link>

      <CardActions>
        <PostActions
          id={props.id.toString()}
          isLiked={props.isLiked}
          likeCount={props.likeCount}
        />
      </CardActions>
    </Card>
  )
}

export default PostCard
