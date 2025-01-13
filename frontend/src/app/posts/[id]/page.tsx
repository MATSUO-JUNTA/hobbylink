import { Metadata } from 'next'
import PostDetail from '@/app/components/PostDetail'
import { fetcher } from '@/utils/fetcher'
import { getServerSidePostByIdUrl } from '@/utils/urls'

type Params = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await fetcher(getServerSidePostByIdUrl(params.id))

  return {
    title: 'HOBBYLINK',
    description: post.content,
    openGraph: {
      title: 'HOBBYLINK',
      description: post.content,
      type: 'article',
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HOBBYLINK',
      description: post.content,
      images: [post.image],
    },
  }
}

const PostById = () => {
  return <PostDetail />
}

export default PostById
