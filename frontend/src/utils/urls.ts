const HOST_API_URL = process.env.NEXT_PUBLIC_API_URL
const DOCKER_API_URL = process.env.NEXT_PUBLIC_DOCKER_API_URL

// APIチェック用URL（GET）
export const apiCheckUrl = `${HOST_API_URL}/api_check`

// サインイン用URL（POST）
export const signInUrl = (provider: string) =>
  `${DOCKER_API_URL}/auth/${provider}/callback`

// カテゴリー一覧取得用のURL（GET）
export const categoriesUrl = (includeImage: boolean) =>
  `${HOST_API_URL}/categories?include_image=${includeImage}`

// 商品検索用URL（GET）
export const searchProductsUrl = `${HOST_API_URL}/products/search?`

// 投稿用URL（POST）
export const createPostUrl = `${HOST_API_URL}/posts`

// 投稿取得URL（GET）
export const getPostByIdUrl = (id: string) => `${HOST_API_URL}/posts/${id}`

// 投稿編集用URL（GET）
export const editPostUrl = (id: string) => `${HOST_API_URL}/posts/${id}/edit`

// 投稿更新用URL（PATCH）
export const updatePostUrl = (id: string) => `${HOST_API_URL}/posts/${id}`

// 投稿削除用URL（DELETE）
export const deletePostUrl = (id: string) => `${HOST_API_URL}/posts/${id}`

// 新着投稿取得用URL（GET）
export const newPostsUrl = `${HOST_API_URL}/posts/new_posts`

// 投稿検索用URL（GET）
export const searchPostsUrl = `${HOST_API_URL}/posts/search`

// 商品取得URL（GET）
export const getProductByIdUrl = (id: string) =>
  `${HOST_API_URL}/products/${id}`
