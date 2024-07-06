import React from 'react'

/** ця сторінка тимчасова , реальне підключення буде тут : src/widgets/layouts/ui/AuthLayout.tsx */
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

import { Sidebar } from '../../widgets/sidebar/index'

const Index: NextPageWithLayout = () => {
  return (
    <div>
      <Sidebar />
    </div>
  )
}

Index.getLayout = getAuthLayout
export default Index
