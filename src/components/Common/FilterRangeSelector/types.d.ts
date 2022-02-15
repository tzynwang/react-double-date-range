import { DATE_RANGE } from '@Components/GeneralModel'
import { Query } from '@Components/App/types'

export interface FilterRangeSelectorProps {
  queryParams: Query
  setQueryParams: React.Dispatch<React.SetStateAction<Query>>
}

export { DATE_RANGE }
