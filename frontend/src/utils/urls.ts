const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL

export const signInUrl = (provider: string) =>
  `${DEFAULT_API_URL}/api/v1/auth/${provider}`
