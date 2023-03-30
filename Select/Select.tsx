import React from 'react'
import ReactSelect from 'react-select'
import { Options } from 'src/types'
import './Select.scss'

interface ISelect {
  options: Options
  placeholder: string
}

const Select: React.FC<ISelect> = React.memo(props => {
  return <ReactSelect {...props} className="react-select" classNamePrefix="react-select" />
})

export default Select
