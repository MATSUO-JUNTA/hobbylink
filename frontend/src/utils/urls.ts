const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL

export const signInUrl = (provider: string) =>
  `${DEFAULT_API_URL}/auth/${provider}/callback`
