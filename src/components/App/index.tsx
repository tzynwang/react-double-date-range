import React, { memo } from 'react'

import FilterRangeSelector from '@Components/Common/FilterRangeSelector'

function App(): React.ReactElement {
  return (
    <main>
      <FilterRangeSelector />
    </main>
  )
}

export default memo(App)
