import { DATE_RANGE } from '@Components/GeneralModel'
import { SelectChangeEvent } from '@mui/material/Select'

export interface SelectorProps {
  label: string
  selectLabelId: string
  value: DATE_RANGE;
  handleChange: (event: SelectChangeEvent) => void;
}
