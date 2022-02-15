import React, { memo, useState, useMemo } from 'react'

import FilterRangeSelector from '@Components/Common/FilterRangeSelector'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Query } from './types'

const INITIAL_QUERY: Query = {
  createdAt: { gte: '', lt: '' },
  updatedAt: { gte: '', lt: '' }
}

function App(): React.ReactElement {
  const [queryParams, setQueryParams] = useState<Query>(INITIAL_QUERY)
  const range = useMemo(
    () => ({
      createdAt:
        queryParams.createdAt.gte && queryParams.createdAt.lt
          ? `${queryParams.createdAt.gte}～${queryParams.createdAt.lt}`
          : null,
      updatedAt:
        queryParams.updatedAt.gte && queryParams.updatedAt.lt
          ? `${queryParams.updatedAt.gte}～${queryParams.updatedAt.lt}`
          : null
    }),
    [queryParams]
  )

  return (
    <main>
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: '600px', margin: '1rem' }}
      >
        <FilterRangeSelector setQueryParams={setQueryParams} />
      </Stack>
      <Stack sx={{ width: '600px', margin: '1rem' }}>
        <Typography>建立日期區間：{range.createdAt}</Typography>
        <Typography>更新日期區間：{range.updatedAt}</Typography>
      </Stack>
    </main>
  )
}

export default memo(App)
