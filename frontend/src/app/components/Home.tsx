'use client'

import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

const Home = () => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/api_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>{data.message}</div>
    </>
  )
}

export default Home
