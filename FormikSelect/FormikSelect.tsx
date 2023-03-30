import { useField } from 'formik'
import React from 'react'
import ReactSelect, { OptionTypeBase } from 'react-select'
import { Options } from 'src/types'
import './FormikSelect.scss'

interface IFormikSelectProps {
  options: Options
  name: string
  placeholder?: string
  className?: string
  label?: string
  changeHandler?: (value?: string) => void
  isLoading?: boolean
  disabled?: boolean
  type?: 'white' | 'black' | 'alt'
}

const FormikSelect: React.FC<IFormikSelectProps> = props => {
  const { options, placeholder, className = '', label, changeHandler, isLoading, disabled, name, type } = props
  const [field, meta, helpers] = useField(props)

  const isEmptyValue = field.value === ''
  const classNameHasValue = field?.value?.length > 0 || !isEmptyValue ? 'has-value' : ''
  const classNameError = meta.error && meta.touched ? 'select--error' : ''
  const classNameType = type ? `select--${type}` : ''

  const onChangeHandle = (value: OptionTypeBase) => {
    helpers.setValue(value.value)
    changeHandler && changeHandler(value.value)
  }

  const getLabel = (): string => {
    const currentOption = options?.find(option => option.value == field.value)
    return currentOption ? currentOption.label : placeholder
  }

  return (
    <div className={`select ${className} ${classNameHasValue} ${classNameError} ${classNameType}`} data-name={name}>
      {label ? <div className="select__label">{label}</div> : null}
      <ReactSelect
        options={options}
        onChange={onChangeHandle}
        placeholder={isEmptyValue ? placeholder : field.value}
        isSearchable={false}
        classNamePrefix="select"
        defaultValue={placeholder ? null : options?.[0]}
        value={{ label: getLabel(), value: field.value }}
        isLoading={isLoading}
        isDisabled={isLoading || disabled}
      />
      {meta.touched && meta.error ? <div className="select__error">{meta.error}</div> : null}
    </div>
  )
}

export default FormikSelect
