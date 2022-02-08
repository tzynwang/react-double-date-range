import React, { memo, useState } from 'react'

import { DATE_RANGE } from '@Components/GeneralModel'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { SelectorProps } from './types'

const MENU = [
  { label: '１天', value: DATE_RANGE.ONE },
  { label: '７天', value: DATE_RANGE.SEVEN },
  { label: '３０天', value: DATE_RANGE.THIRTY },
  { label: '９０天', value: DATE_RANGE.NINETY },
  { label: '自訂日期區間', value: DATE_RANGE.CUSTOM },
  { label: '清除日期區間', value: DATE_RANGE.CLEAR }
]

function Selector(props: SelectorProps): React.ReactElement {
  // props
  const { label, selectLabelId, value, handleChange } = props

  // main
  return (
    <FormControl fullWidth>
      <InputLabel id={selectLabelId}>{label}</InputLabel>
      <Select
        labelId={selectLabelId}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {MENU.map((m) => (
          <MenuItem key={m.value} value={m.value}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default memo(Selector)
