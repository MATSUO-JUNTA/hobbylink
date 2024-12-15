'use client'

import camelcaseKeys from 'camelcase-keys'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import Error from '@/app/components/Error'
import Loading from '@/app/components/Loading'
import NavigationHeader from '@/app/components/NavigationHeader'
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
  const { isFormReady, setIsFormReady, setField, addProducts } =
    useContext(FormContext)
  const { data, error } = useSWR(id ? editPostUrl(id) : null, (url) =>
    fetcher(url, session?.user.token),
  )

  useEffect(() => {
    mutate(editPostUrl(id))
  }, [data, id])

  useEffect(() => {
    if (data && !isFormReady) {
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
      setIsFormReady(true)
    }
  }, [data, setField, addProducts, isFormReady, setIsFormReady])

  if (error) return <Error />
  if (!data) return <Loading />

  return (
    <>
      <NavigationHeader title="投稿の編集" />
      <PostForm postId={id} />
    </>
  )
}

export default Posts
