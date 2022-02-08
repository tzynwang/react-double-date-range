import React, { memo } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'

// run npm i @mui/lab
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

import { DateRangeCalenderProps } from './types'

function DateRangeCalender(props: DateRangeCalenderProps): React.ReactElement {
  const { open, handleClick, gte, setGte, lt, setLt } = props

  return (
    <Dialog open={open} sx={{ padding: '1rem' }}>
      <Stack spacing={2} sx={{ margin: '1rem' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="開始日期"
            value={gte}
            onChange={(newValue) => setGte(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="結束日期"
            value={lt}
            onChange={(newValue) => setLt(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      <Button onClick={handleClick(false)} disableElevation>
        取消
      </Button>
      <Button onClick={handleClick(true)} variant="contained" disableElevation>
        確認
      </Button>
    </Dialog>
  )
}

export default memo(DateRangeCalender)
