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
