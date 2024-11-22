import { Suspense } from 'react'
import PostSearchResults from '@/app/components/PostSearchResults'

const SearchResults = () => {
  return (
    <Suspense>
      <PostSearchResults />
    </Suspense>
  )
}

export default SearchResults
