export interface DateRangeCalenderProps {
  open: boolean
  calenderFor: 'createdAt' | 'updatedAt'
  handleClick: (action: boolean) => () => void
  gte: Date | null
  setGte: (newValue: Date | null) => void
  lt: Date | null
  setLt: (newValue: Date | null) => void
}
