'use client'

import camelcaseKeys from 'camelcase-keys'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import PostForm from '@/app/components/PostForm'
import { FormContext, Product } from '@/contexts/FormContext'
import { fetcher } from '@/utils/fetcher'
import { imageFetcher } from '@/utils/imageFetcher'
import { editPostUrl } from '@/utils/urls'

type PostProps = {
  image: string
  content: string
  category: {
    id: number
  }
  products: Product[]
}
const Posts = () => {
  const { id } = useParams<{ id: string }>()
  const { data: session } = useSession()
  const { setField, addProducts } = useContext(FormContext)
  const { data, error } = useSWR(
    id && session ? [editPostUrl(id), session.user.token] : null,
    ([url, token]) => fetcher(url, token as string),
  )
  useEffect(() => {
    if (data && !sessionStorage.getItem('isSetForm')) {
      const post: PostProps = camelcaseKeys(data, { deep: true })

      imageFetcher(post.image).then((file) => {
        if (file) {
          setField('image', file)
        }
      })
      setField('content', post.content)
      setField('category', post.category.id.toString())
      addProducts(
        post.products.map((product) => ({
          ...product,
          id: product.id.toString(),
        })),
      )
      sessionStorage.setItem('isSetForm', 'true')
    }
  }, [data, setField, addProducts])

  if (error) return <Error />
  if (!data) return <Loading />

  return <PostForm postId={id} />
}

export default Posts
