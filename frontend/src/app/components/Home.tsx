'use client'

import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { apiCheckUrl } from '@/utils/urls'

const Home = () => {
  const { data, error } = useSWR(apiCheckUrl, fetcher)
  const { data: session } = useSession()

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>{data.message}</div>
      <div>
        {session && session.user && (
          <div>
            <p>Image: {session.user.image}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
