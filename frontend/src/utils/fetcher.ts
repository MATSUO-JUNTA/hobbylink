import axios, { AxiosResponse, AxiosError } from 'axios'

export const fetcher = (url: string, token?: string) =>
  axios
    .get(url, {
      headers: {
        'auth-token': token,
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: AxiosError) => {
      console.log(e)
      throw e
    })

export const getKey = <T>(
  pageIndex: number,
  previousPageData: T[],
  url: string,
) => {
  if (previousPageData && !previousPageData.length) return null
  return `${url}?page=${pageIndex + 1}`
}
