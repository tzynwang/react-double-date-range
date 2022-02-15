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
  const { setQueryParams } = props
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
        setCalenderDialogC(false)
        setCalender((prev) => ({
          ...prev,
          createdAt: { gte: null, lt: null }
        }))
      }
      if (calenderFor === 'updatedAt') {
        setDateRange((prev) => ({ ...prev, updatedAt: DATE_RANGE.CLEAR }))
        setCalenderDialogU(false)
        setCalender((prev) => ({
          ...prev,
          updatedAt: { gte: null, lt: null }
        }))
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
    switch (dateRange.createdAt) {
      case DATE_RANGE.ONE:
      case DATE_RANGE.SEVEN:
      case DATE_RANGE.THIRTY:
      case DATE_RANGE.NINETY:
        setQueryParams((prev) => ({
          ...prev,
          createdAt: {
            gte: dayjs()
              .add(-+dateRange.createdAt, 'day')
              .format('YYYY年MM月DD日'),
            lt: dayjs().format('YYYY年MM月DD日')
          }
        }))
        setCalender((prev) => ({
          ...prev,
          createdAt: { gte: null, lt: null }
        }))
        break
      case DATE_RANGE.CUSTOM:
        setCalenderFor('createdAt')
        setCalenderDialogC(true)
        break
      case DATE_RANGE.CLEAR:
        setQueryParams((prev) => ({
          ...prev,
          createdAt: { gte: '', lt: '' }
        }))
        setCalender((prev) => ({
          ...prev,
          createdAt: { gte: null, lt: null }
        }))
        break
      default:
        return
    }
  }, [dateRange.createdAt])
  useEffect(() => {
    switch (dateRange.updatedAt) {
      case DATE_RANGE.ONE:
      case DATE_RANGE.SEVEN:
      case DATE_RANGE.THIRTY:
      case DATE_RANGE.NINETY:
        setQueryParams((prev) => ({
          ...prev,
          updatedAt: {
            gte: dayjs()
              .add(-+dateRange.updatedAt, 'day')
              .format('YYYY年MM月DD日'),
            lt: dayjs().format('YYYY年MM月DD日')
          }
        }))
        setCalender((prev) => ({
          ...prev,
          updatedAt: { gte: null, lt: null }
        }))
        break
      case DATE_RANGE.CUSTOM:
        setCalenderFor('updatedAt')
        setCalenderDialogU(true)
        break
      case DATE_RANGE.CLEAR:
        setQueryParams((prev) => ({
          ...prev,
          updatedAt: { gte: '', lt: '' }
        }))
        setCalender((prev) => ({
          ...prev,
          updatedAt: { gte: null, lt: null }
        }))
        break
      default:
        return
    }
  }, [dateRange.updatedAt])
  // reset calender lt when gte > lt
  useEffect(() => {
    if (dayjs(calender.createdAt.gte).diff(dayjs(calender.createdAt.lt)) > 0) {
      setCalender((prev) => ({
        ...prev,
        createdAt: { ...prev.createdAt, lt: null }
      }))
    }
    if (dayjs(calender.updatedAt.gte).diff(dayjs(calender.updatedAt.lt)) > 0) {
      setCalender((prev) => ({
        ...prev,
        updatedAt: { ...prev.updatedAt, lt: null }
      }))
    }
  }, [calender])

  // main
  return (
    <React.Fragment>
      <Selector
        label={'建立日期區間'}
        selectLabelId={'createdAtLabel'}
        value={dateRange.createdAt}
        dateRange={
          calender.createdAt.gte && calender.createdAt.lt
            ? `${dayjs(calender.createdAt.gte).format('YYYY/MM/DD')}-${dayjs(
                calender.createdAt.lt
              ).format('YYYY/MM/DD')}`
            : undefined
        }
        handleChange={handleChange('createdAt')}
      />
      <Selector
        label={'更新日期區間'}
        selectLabelId={'updatedAtLabel'}
        value={dateRange.updatedAt}
        dateRange={
          calender.updatedAt.gte && calender.updatedAt.lt
            ? `${dayjs(calender.updatedAt.gte).format('YYYY/MM/DD')}-${dayjs(
                calender.updatedAt.lt
              ).format('YYYY/MM/DD')}`
            : undefined
        }
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
