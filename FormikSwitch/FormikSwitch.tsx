import { useField } from 'formik'
import React from 'react'
import './FormikSwitch.scss'
interface IFormikSwitch {
  name: string
  onChange?: () => void
}

const FormikSwitch: React.FC<IFormikSwitch> = React.memo(props => {
  const { onChange } = props
  const [field, meta, helpers] = useField(props)

  const handleSubmit = e => {
    helpers.setValue(e.target.checked)
    onChange && onChange()
  }

  return (
    <>
      <label className="switch">
        <input className="switch__input" type="checkbox" checked={field.value} onChange={handleSubmit} defaultValue={field.value} />
        <span className="switch__slider"></span>
      </label>
    </>
  )
})

export default FormikSwitch
