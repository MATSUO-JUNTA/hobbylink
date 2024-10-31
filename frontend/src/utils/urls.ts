const HOST_API_URL = process.env.NEXT_PUBLIC_API_URL
const DOCKER_API_URL = process.env.NEXT_PUBLIC_DOCKER_API_URL

export const apiCheckUrl = `${HOST_API_URL}/api_check`

export const signInUrl = (provider: string) =>
  `${DOCKER_API_URL}/auth/${provider}/callback`
