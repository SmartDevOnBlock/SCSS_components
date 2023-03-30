import { useField } from 'formik'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ReactSVG } from 'react-svg'
import Icon from '../Icon/Icon'
import './FormikField.scss'

interface IFormikFieldProps {
  name: string
  value?: string
  placeholder?: string
  type?: string
  icon?: string
  className?: string
  label?: string
  isTextarea?: boolean
  readonly?: boolean
  disabled?: boolean
  changeHandler?: (event) => void
  onChange?: (event) => void
  showCloseBtn?: boolean
  autoComplete?: 'on' | 'off'
  isCopy?: boolean
}

const FormikField: React.FC<IFormikFieldProps> = React.memo(({ ...props }) => {
  const {
    name,
    type,
    icon,
    className = '',
    label,
    isTextarea,
    placeholder,
    readonly,
    disabled,
    changeHandler,
    onChange,
    showCloseBtn,
    autoComplete = 'on',
    isCopy,
  } = props

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [fieldType, setfieldType] = useState<string>(type ? type : 'text')
  const [copied, setCopied] = useState<boolean>()

  const [field, meta, helpers] = useField(props)

  const withIconClassName = icon ? 'field--with-icon' : ''
  const errorClassName = meta.error && meta.touched ? 'field--error' : ''
  const copyClassName = isCopy ? 'field--copy' : ''

  const onChangeHandle = event => {
    helpers.setValue(event.target.value)
    changeHandler && changeHandler(event)
  }

  const handleChange = event => {
    helpers.setValue(event.target.value)
    onChange && onChange(event)
  }

  const handlePasswordShow = (): void => {
    setIsVisible(prevState => {
      setfieldType(!prevState ? 'text' : 'password')
      return !prevState
    })
  }

  return (
    <label className={`field ${className} ${withIconClassName} ${errorClassName} ${copyClassName}`} data-name={name}>
      {!label ? null : <span className="field__label">{label}</span>}
      <span className="field__input">
        {icon ? <Icon name={icon} className="field__icon" /> : null}
        {isTextarea ? (
          <textarea {...field} name={name} value={field.value} placeholder={placeholder} />
        ) : (
          <input
            {...field}
            name={name}
            value={field.value}
            placeholder={placeholder}
            type={fieldType}
            onBlur={onChangeHandle}
            onChange={handleChange}
            readOnly={readonly}
            disabled={disabled}
            autoComplete={autoComplete}
          />
        )}
        {isCopy ? (
          <CopyToClipboard text={field.value} onCopy={() => setCopied(true)}>
            <Icon name="copy" className="field__copy-icon" />
          </CopyToClipboard>
        ) : null}

        {showCloseBtn ? (
          <button
            type="submit"
            className="field__close"
            style={{
              visibility: field.value.length > 1 ? 'visible' : 'hidden',
              opacity: field.value.length > 1 ? 1 : 0,
            }}
            onClick={() => helpers.setValue('')}
          >
            <Icon name="close" />
          </button>
        ) : null}
        {type === 'password' ? (
          <span className="field__show-password" onClick={() => handlePasswordShow()}>
            {isVisible ? <ReactSVG src="assets/images/eye-closed.svg" /> : <ReactSVG src="assets/images/eye.svg" />}
          </span>
        ) : null}
      </span>
      {meta.touched && meta.error ? <div className="field__error">{meta.error}</div> : null}
    </label>
  )
})

export default FormikField
