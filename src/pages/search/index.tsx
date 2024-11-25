import { SearchDialog } from '@/features/search'
import { NextPageWithLayout } from '@/shared/types'
import { getMainLayout } from '@/widgets/layouts'

const SearchUser: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Search</h1>
      <SearchDialog />
      Recent requests
    </div>
  )
}

SearchUser.getLayout = getMainLayout

export default SearchUser
