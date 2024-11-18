const HOST_API_URL = process.env.NEXT_PUBLIC_API_URL
const DOCKER_API_URL = process.env.NEXT_PUBLIC_DOCKER_API_URL

// APIチェック用URL（GET）
export const apiCheckUrl = `${HOST_API_URL}/api_check`

// サインイン用URL（POST）
export const signInUrl = (provider: string) =>
  `${DOCKER_API_URL}/auth/${provider}/callback`

// カテゴリー一覧取得用のURL（GET）
export const categoriesUrl = `${HOST_API_URL}/categories`

// 商品検索用URL（GET）
export const searchProductsUrl = `${HOST_API_URL}/products/search?`

// 投稿用URL（POST）
export const createPostUrl = `${HOST_API_URL}/posts`

// 投稿取得URL（GET）
export const getPostByIdUrl = (id: string) => `${HOST_API_URL}/posts/${id}`
