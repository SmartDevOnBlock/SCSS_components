import { useField } from 'formik'
import React from 'react'
import './FormikCheckbox.scss'

interface IFormikCheckbox {
  name: string
  label?: string
  onChange?: () => void
}

const FormikCheckbox: React.FC<IFormikCheckbox> = React.memo(props => {
  const { label, onChange } = props
  const [field, meta, helpers] = useField(props)

  const handleSubmit = e => {
    helpers.setValue(e.target.checked)
    onChange && onChange()
  }

  return (
    <>
      <label className="checkbox">
        <input className="checkbox__input" type="checkbox" checked={field.value} onChange={handleSubmit} defaultValue={field.value} />
        <span className="checkbox__box"></span>
        <span className="checkbox__label">{label}</span>
      </label>
    </>
  )
})

export default FormikCheckbox
