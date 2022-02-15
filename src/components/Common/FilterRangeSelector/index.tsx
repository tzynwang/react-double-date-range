import React, { memo, useState, useEffect } from 'react'
import dayjs from 'dayjs'

import Selector from '@Components/Base/Select'
import DateRangeCalender from '@Components/Base/DateRangeCalender'
import { DATE_RANGE } from '@Components/GeneralModel'

import { SelectChangeEvent } from '@mui/material/Select'

import { FilterRangeSelectorProps } from './types'

const INITIAL_DATE = {
  createdAt: DATE_RANGE.CLEAR,
  updatedAt: DATE_RANGE.CLEAR
}

const CALENDER: {
  createdAt: { gte: null | Date; lt: null | Date }
  updatedAt: { gte: null | Date; lt: null | Date }
} = {
  createdAt: { gte: null, lt: null },
  updatedAt: { gte: null, lt: null }
}

function FilterRangeSelector(
  props: FilterRangeSelectorProps
): React.ReactElement {
  // states
  const { queryParams, setQueryParams } = props
  const [dateRange, setDateRange] = useState(INITIAL_DATE)
  const [calenderFor, setCalenderFor] =
    useState<'createdAt' | 'updatedAt' | ''>('')
  const [calenderDialogC, setCalenderDialogC] = useState(false)
  const [calenderDialogU, setCalenderDialogU] = useState(false)
  const [calender, setCalender] = useState(CALENDER)

  // functions
  // drop down menu change
  const handleChange =
    (target: 'createdAt' | 'updatedAt') => (event: SelectChangeEvent) => {
      if (target === 'createdAt') {
        setDateRange((prev) => ({
          ...prev,
          createdAt: event.target.value as DATE_RANGE
        }))
      }
      if (target === 'updatedAt') {
        setDateRange((prev) => ({
          ...prev,
          updatedAt: event.target.value as DATE_RANGE
        }))
      }
    }
  const handleGte =
    (calenderFor: 'createdAt' | 'updatedAt') => (newValue: Date | null) => {
      if (calenderFor === 'createdAt') {
        setCalender((prev) => ({
          ...prev,
          createdAt: { ...prev.createdAt, gte: newValue }
        }))
      }
      if (calenderFor === 'updatedAt') {
        setCalender((prev) => ({
          ...prev,
          updatedAt: { ...prev.updatedAt, gte: newValue }
        }))
      }
    }
  const handleLt =
    (calenderFor: 'createdAt' | 'updatedAt') => (newValue: Date | null) => {
      if (calenderFor === 'createdAt') {
        setCalender((prev) => ({
          ...prev,
          createdAt: { ...prev.createdAt, lt: newValue }
        }))
      }
      if (calenderFor === 'updatedAt') {
        setCalender((prev) => ({
          ...prev,
          updatedAt: { ...prev.updatedAt, lt: newValue }
        }))
      }
    }
  // calender dialog click
  const handleClick = (action: boolean) => () => {
    // when close calender dialog, reset dateRange to CLEAR
    if (!action) {
      if (calenderFor === 'createdAt') {
        setDateRange((prev) => ({ ...prev, createdAt: DATE_RANGE.CLEAR }))
      }
      if (calenderFor === 'updatedAt') {
        setDateRange((prev) => ({ ...prev, updatedAt: DATE_RANGE.CLEAR }))
      }
    }

    if (calender.createdAt.gte && calender.createdAt.lt) {
      setQueryParams((prev) => ({
        ...prev,
        createdAt: {
          gte: dayjs(calender.createdAt.gte).format('YYYY年MM月DD日'),
          lt: dayjs(calender.createdAt.lt).format('YYYY年MM月DD日')
        }
      }))
      setCalenderDialogC(false)
    }
    if (calender.updatedAt.gte && calender.updatedAt.lt) {
      setQueryParams((prev) => ({
        ...prev,
        updatedAt: {
          gte: dayjs(calender.updatedAt.gte).format('YYYY年MM月DD日'),
          lt: dayjs(calender.updatedAt.lt).format('YYYY年MM月DD日')
        }
      }))
      setCalenderDialogU(false)
    }
  }

  // hooks
  useEffect(() => {
    let c = { gte: '', lt: '' }

    // if 1, 7, 30, 90
    if (dateRange.createdAt.length && !Number.isNaN(+dateRange.createdAt)) {
      c = {
        gte: dayjs()
          .add(-+dateRange.createdAt, 'day')
          .format('YYYY年MM月DD日'),
        lt: dayjs().format('YYYY年MM月DD日')
      }
    }

    // if custom, open calender
    if (dateRange.createdAt === DATE_RANGE.CUSTOM) {
      setCalenderFor('createdAt')
      setCalenderDialogC(true)
    }

    // if clear, remove date range info
    if (!dateRange.createdAt.length) {
      c = { gte: '', lt: '' }
    }

    // finally, set queryParams
    setQueryParams((prev) => ({
      ...prev,
      createdAt: { ...c }
    }))
  }, [dateRange.createdAt])
  useEffect(() => {
    let u = { gte: '', lt: '' }

    // if 1, 7, 30, 90
    if (dateRange.updatedAt.length && !Number.isNaN(+dateRange.updatedAt)) {
      u = {
        gte: dayjs()
          .add(-+dateRange.updatedAt, 'day')
          .format('YYYY年MM月DD日'),
        lt: dayjs().format('YYYY年MM月DD日')
      }
    }

    // if custom, open calender
    if (dateRange.updatedAt === DATE_RANGE.CUSTOM) {
      setCalenderFor('updatedAt')
      setCalenderDialogU(true)
    }

    // if clear, remove date range info
    if (!dateRange.updatedAt.length) {
      u = { gte: '', lt: '' }
    }

    // finally, set queryParams
    setQueryParams((prev) => ({
      ...prev,
      updatedAt: { ...u }
    }))
  }, [dateRange.updatedAt])
  useEffect(() => {
    console.log(queryParams)
  }, [queryParams])

  // main
  return (
    <React.Fragment>
      <Selector
        label={'建立日期區間'}
        selectLabelId={'createdAtLabel'}
        value={dateRange.createdAt}
        handleChange={handleChange('createdAt')}
      />
      <Selector
        label={'更新日期區間'}
        selectLabelId={'updatedAtLabel'}
        value={dateRange.updatedAt}
        handleChange={handleChange('updatedAt')}
      />
      <DateRangeCalender
        open={calenderDialogC}
        calenderFor={'createdAt'}
        handleClick={handleClick}
        gte={calender.createdAt.gte}
        setGte={handleGte('createdAt')}
        lt={calender.createdAt.lt}
        setLt={handleLt('createdAt')}
      />
      <DateRangeCalender
        open={calenderDialogU}
        calenderFor={'updatedAt'}
        handleClick={handleClick}
        gte={calender.updatedAt.gte}
        setGte={handleGte('updatedAt')}
        lt={calender.updatedAt.lt}
        setLt={handleLt('updatedAt')}
      />
    </React.Fragment>
  )
}

export default memo(FilterRangeSelector)
