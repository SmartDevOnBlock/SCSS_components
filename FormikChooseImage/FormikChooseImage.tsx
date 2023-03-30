import { useField } from 'formik'
import React from 'react'
import { fileToBase64 } from 'src/helper'
import Icon from '../Icon/Icon'
import './FormikChooseImage.scss'

interface IFormikChooseImage {
  name: string
  changeHandler?: (event) => void
}

const FormikChooseImage: React.FC<IFormikChooseImage> = React.memo(props => {
  const { name, changeHandler } = props
  const [field, meta, helpers] = useField(props)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    const base64 = await fileToBase64(file)

    helpers.setValue({
      file: base64,
      filename: file.name,
    })

    changeHandler && changeHandler(event)
  }

  return (
    <div className={`choose-image ${field.value ? 'choose-image--has-value' : ''}`}>
      <label className="choose-image__block">
        <input name={name} className="choose-image__input" type="file" onChange={handleChange} />
        {field.value ? (
          'Change image'
        ) : (
          <>
            <Icon className="choose-image__icon" name="choose" />
            <span className="choose-image__name">Choose image</span>
          </>
        )}
      </label>
      {meta.touched && meta.error ? <div className="choose-image__error">{meta.error}</div> : null}
    </div>
  )
})

export default FormikChooseImage
