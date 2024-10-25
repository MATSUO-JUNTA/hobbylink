'use client'

import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

const Home = () => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/api_check'
  const { data, error } = useSWR(url, fetcher)
  const { data: session } = useSession()

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>{data.message}</div>
      <div>
        {session && session.user && (
          <div>
            <h1>User Information</h1>
            <p>ID: {session.user.id}</p>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <p>Bio: {session.user.bio}</p>
            <p>Token: {session.user.token}</p> {/* トークンを表示 */}
            <img src={session.user.image} alt={session.user.name} />
          </div>
        )}
      </div>
    </>
  )
}

export default Home
